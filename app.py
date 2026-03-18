from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

expenses = []

@app.route("/add", methods=["POST"])
def add():
    data = request.json
    expenses.append(data)
    return jsonify({"message": "Added"})

@app.route("/get", methods=["GET"])
def get():
    return jsonify(expenses)

@app.route("/insight", methods=["GET"])
def insight():
    total = sum(e["amount"] for e in expenses)
    food = sum(e["amount"] for e in expenses if e["category"] == "Food")

    if total == 0:
        return jsonify({"message": "No data"})

    if food > total * 0.4:
        return jsonify({"message": "You are spending too much on food"})
    
    return jsonify({"message": "Your spending is okay"})

app.run(debug=True)
