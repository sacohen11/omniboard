from flask import Flask
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return {'status': 'ok'}

# Document-related endpoints removed

@app.route('/api/links', methods=['GET'])
def get_links():
    # Mock links data
    links = [
        {"id": 1, "title": "Link 1", "url": "http://example.com/1", "type": "external", "active": True},
        {"id": 2, "title": "Link 2", "url": "http://example.com/2", "type": "internal", "category": "cat1", "active": True}
    ]
    return json.dumps(links)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True) 