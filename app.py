from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "FakeDoc Detector Backend Running!"

@app.route("/analyze", methods=["POST"])
def analyze():

    return jsonify({
        "document_type": "Certificate",
        "authenticity_score": 92,
        "status": "Authentic",
        "issues": [
            "No major issues detected"
        ]
    })

@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    message = data.get("message", "").lower()

    if "fake" in message:
        reply = "A document may be fake if fonts, metadata or layout differ from official templates."

    elif "certificate" in message:
        reply = "Upload the certificate and click Detect Forgery."

    else:
        reply = "I am FakeDoc Assistant. Ask me about document verification."

    return jsonify({
        "reply": reply
    })

if __name__ == "__main__":
    app.run(debug=True)
