import os
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'

if __name__ == '__main__':
    try:
        port = int(os.environ.get('PORT', 8080))
        # Validate port is in a valid range
        if not (1 <= port <= 65535):
            print(f"Warning: Port {port} is out of valid range (1-65535). Using default port 8080.")
            port = 8080
    except ValueError:
        print(f"Warning: Invalid PORT value. Using default port 8080.")
        port = 8080
    
    app.run(debug=True, host='0.0.0.0', port=port)