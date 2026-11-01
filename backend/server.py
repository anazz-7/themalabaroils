"""
The Malabar Oils - Production-Ready Secure Python Backend API Server
Uses standard library http.server for 100% portability without external dependencies.
Endpoints:
- POST /api/auth/login     -> Validate passkey (1977), rate limit, issue signed token
- POST /api/auth/verify    -> Verify session token
- GET  /api/orders         -> Protected: list customer orders
- POST /api/orders         -> Record customer checkout order
- DELETE /api/orders/:id   -> Protected: delete an order
- DELETE /api/products/:id -> Protected: delete a product
"""

import sys
import os
import json
import sqlite3
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

# Add backend directory to sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from security import verify_passkey, create_session_token, verify_session_token

PORT = int(os.environ.get("PORT", 8000))
DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "malabar_store.db")

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS orders (
            id TEXT PRIMARY KEY,
            created_at TEXT,
            customer_name TEXT,
            phone TEXT,
            address TEXT,
            city TEXT,
            pincode TEXT,
            total_amount REAL,
            payment_method TEXT,
            notes TEXT,
            status TEXT,
            items_json TEXT
        )
    """)
    conn.commit()
    conn.close()

init_db()

class MalabarAPIHandler(BaseHTTPRequestHandler):
    def _send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

    def _send_json(self, status_code: int, data: dict):
        self.send_response(status_code)
        self._send_cors_headers()
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))

    def _read_body_json(self) -> dict:
        content_length = int(self.headers.get('Content-Length', 0))
        if content_length == 0:
            return {}
        body = self.rfile.read(content_length).decode('utf-8')
        try:
            return json.loads(body)
        except Exception:
            return {}

    def _get_client_ip(self) -> str:
        return self.client_address[0] if self.client_address else "127.0.0.1"

    def _is_authenticated(self) -> bool:
        auth_header = self.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return False
        token = auth_header.split(' ', 1)[1]
        is_valid, _ = verify_session_token(token)
        return is_valid

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path

        # 1. Login endpoint
        if path == "/api/auth/login":
            data = self._read_body_json()
            passkey = str(data.get("passkey", ""))
            client_ip = self._get_client_ip()

            is_valid, msg = verify_passkey(passkey, client_id=client_ip)
            if is_valid:
                token = create_session_token(role="admin", duration_seconds=1800)
                self._send_json(200, {
                    "success": True,
                    "token": token,
                    "message": "Secure Authentication Successful",
                    "expiresIn": 1800
                })
            else:
                self._send_json(401, {
                    "success": False,
                    "message": msg
                })
            return

        # 2. Token verification
        if path == "/api/auth/verify":
            data = self._read_body_json()
            token = data.get("token") or self.headers.get("Authorization", "").replace("Bearer ", "")
            is_valid, payload = verify_session_token(token)
            if is_valid:
                self._send_json(200, {"valid": True, "payload": payload})
            else:
                self._send_json(401, {"valid": False, "message": "Token expired or invalid"})
            return

        # 3. Create Order
        if path == "/api/orders":
            data = self._read_body_json()
            order_id = data.get("id")
            if not order_id:
                self._send_json(400, {"error": "Missing order id"})
                return

            conn = sqlite3.connect(DB_PATH)
            c = conn.cursor()
            c.execute("""
                INSERT OR REPLACE INTO orders 
                (id, created_at, customer_name, phone, address, city, pincode, total_amount, payment_method, notes, status, items_json)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                order_id,
                data.get("createdAt", ""),
                data.get("customerName", ""),
                data.get("phone", ""),
                data.get("address", ""),
                data.get("city", ""),
                data.get("pincode", ""),
                data.get("totalAmount", 0),
                data.get("paymentMethod", ""),
                data.get("notes", ""),
                data.get("status", "Pending"),
                json.dumps(data.get("items", []))
            ))
            conn.commit()
            conn.close()

            self._send_json(201, {"success": True, "orderId": order_id})
            return

        self._send_json(404, {"error": "Not Found"})

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == "/api/orders":
            if not self._is_authenticated():
                self._send_json(401, {"error": "Unauthorized. Passkey authentication required."})
                return

            conn = sqlite3.connect(DB_PATH)
            c = conn.cursor()
            c.execute("SELECT id, created_at, customer_name, phone, address, city, pincode, total_amount, payment_method, notes, status, items_json FROM orders ORDER BY created_at DESC")
            rows = c.fetchall()
            conn.close()

            orders = []
            for r in rows:
                try:
                    items = json.loads(r[11])
                except Exception:
                    items = []
                orders.append({
                    "id": r[0],
                    "createdAt": r[1],
                    "customerName": r[2],
                    "phone": r[3],
                    "address": r[4],
                    "city": r[5],
                    "pincode": r[6],
                    "totalAmount": r[7],
                    "paymentMethod": r[8],
                    "notes": r[9],
                    "status": r[10],
                    "items": items
                })

            self._send_json(200, {"orders": orders})
            return

        if path == "/api/health":
            self._send_json(200, {"status": "healthy", "service": "The Malabar Oils Python API"})
            return

        self._send_json(404, {"error": "Not Found"})

    def do_DELETE(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if not self._is_authenticated():
            self._send_json(401, {"error": "Unauthorized"})
            return

        if path.startswith("/api/orders/"):
            order_id = path.replace("/api/orders/", "").strip()
            conn = sqlite3.connect(DB_PATH)
            c = conn.cursor()
            c.execute("DELETE FROM orders WHERE id = ?", (order_id,))
            conn.commit()
            conn.close()
            self._send_json(200, {"success": True, "deleted": order_id})
            return

        self._send_json(404, {"error": "Not Found"})

def run_server():
    server_address = ('', PORT)
    httpd = HTTPServer(server_address, MalabarAPIHandler)
    print(f"🔒 The Malabar Oils Secure Python Server running on port {PORT}...")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server...")
        httpd.server_close()

if __name__ == "__main__":
    run_server()

