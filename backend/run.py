from app import create_app
from flask_cors import CORS
app = create_app()
CORS(app, origins="*", allow_headers="*")
if __name__ == "__main__":
    app.run(host='192.168.130.168', port=5000, debug=True)
    app.run(debug=True)
