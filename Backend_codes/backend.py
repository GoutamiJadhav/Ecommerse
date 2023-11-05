from flask import Flask, request, jsonify
from flask_cors import CORS
import pymongo

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for the API

# Set up the MongoDB client
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["login_data"]  # Replace 'login_data' with your database name
collection = db["users"]
cart_collection = db['cart']

@app.route('/loginb', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = collection.find_one({'email': email})

    if user:
        if user['password'] == password:
            return jsonify({'message': 'Login successful'})
        else:
            return jsonify({'message': 'Invalid credentials'}), 401
    else:
        # Add the new user with the given credentials
        collection.insert_one({'email': email, 'password': password})
        return jsonify({'message': 'New user added'})

@app.route('/buy12', methods=['POST'])
def buy():
    data1 = request.get_json()
    cart_items = data1.get('cartItems', [])
    total_price = data1.get('totalPrice', 0)
    cart_collection.insert_one({'cart_items': cart_items, 'total_price': total_price})

    return jsonify({'message': 'Data inserted successfully'})



if __name__ == '__main__':
    app.run(debug=True)
