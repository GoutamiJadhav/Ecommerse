from flask import Flask, request, jsonify
from flask_cors import CORS
import pymongo

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for the API

# Set up the MongoDB client
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["login_creds"]  # Replace 'login_data' with your database name
collection = db["users"]
cart_collection = db['cart']

# Function to encrypt data
# def encrypt_data(data, shift=3):
#     encrypted_data = ""
#     for char in data:
#         encrypted_data += chr(ord(char) + shift)
#     return encrypted_data
def encrypt_data(data, shift=3):
    if isinstance(data, str):
        encrypted_data = ""
        for char in data:
            encrypted_data += chr(ord(char) + shift)
        return encrypted_data
    elif isinstance(data, list):
        encrypted_list = []
        for item in data:
            if isinstance(item, dict):
                encrypted_dict = {}
                for key, value in item.items():
                    if isinstance(value, str):
                        encrypted_dict[key] = "".join([chr(ord(char) + shift) for char in value])
                    else:
                        encrypted_dict[key] = value
                encrypted_list.append(encrypted_dict)
            else:
                encrypted_list.append(item)
        return encrypted_list
    else:
        return None


# Function to decrypt data
# def decrypt_data(data, shift=3):
#     decrypted_data = ""
#     for char in data:
#         decrypted_data += chr(ord(char) - shift)
#     return decrypted_data
def decrypt_data(data, shift=3):
    if isinstance(data, str):
        decrypted_data = ""
        for char in data:
            decrypted_data += chr(ord(char) - shift)
        return decrypted_data
    elif isinstance(data, list):
        decrypted_list = []
        for item in data:
            if isinstance(item, dict):
                decrypted_dict = {}
                for key, value in item.items():
                    if isinstance(value, str):
                        decrypted_dict[key] = "".join([chr(ord(char) - shift) for char in value])
                    else:
                        decrypted_dict[key] = value
                decrypted_list.append(decrypted_dict)
            else:
                decrypted_list.append(item)
        return decrypted_list
    else:
        return None


@app.route('/signin', methods=['POST'])
def login():
    data= request.get_json()
    print(data)
    email = encrypt_data(data.get('email'))
    password = encrypt_data(data.get('password'))
    user = collection.find_one({'email': email})

    if user:
        if decrypt_data(user['password']) == decrypt_data(password):
            return jsonify({'message': 'Login successful'})
        else:
            return jsonify({'message': 'Invalid credentials'}), 401
    else:
        # Add the new user with the given credentials
        collection.insert_one({'email': email, 'password': password})
        return jsonify({'message': 'New user added'})

@app.route('/shopcart', methods=['POST'])
def buy():
    data1= request.get_json()
    print(data1)
    encrypted_cart_items = [encrypt_data(item) for item in data1.get('cartItems', [])]
    encrypted_total_price = encrypt_data(str(data1.get('totalPrice', 0)))
    cart_collection.insert_one({'cart_items': encrypted_cart_items, 'total_price': encrypted_total_price})

    return jsonify({'message': 'Data inserted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
