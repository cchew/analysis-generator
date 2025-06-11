# Backend API

This is a simple Flask API that returns "Hello World!" when accessed.

## Setup

1. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Run the Flask application:
   ```
   python app.py
   ```

The API will be available at http://localhost:8080/ by default.

You can configure the port by setting the PORT environment variable:
   ```
   PORT=9000 python app.py
   ```

Note: The PORT value must be a valid port number between 1 and 65535. If an invalid port is specified, the application will default to port 8080.

## Testing

To run the tests:
```
python test_app.py
```