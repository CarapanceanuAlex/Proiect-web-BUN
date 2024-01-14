from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

import sqlite3

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5501"}}) #permite requesturi din orice origine

@app.route('/<path:path>')
def send_html(path):
    return send_from_directory('', path)

@app.route("/api/v1/register", methods=["POST"])
def register():
    body = request.json 

    try:
        data = request.get_json()
        print("Received data:", data)
        # check data validity
        if body["password"] != body["retype_password"]:
            response = {
                "message": f"Password mismatch."
            }
            response = jsonify(response)
            response.headers.add("Access-Control-Allow-Origin", "*")
            return response, 400
        
        # create new user 
        # open a new connection to db
        connection = sqlite3.connect("DB/User.db")

        # define SQL query to run
        query = f"""INSERT INTO Users(Email, Password) VALUES ('{body["email"]}', '{body["password"]}')"""

        # create a new cursor
        cursor = connection.cursor()

        # execute query
        cursor.execute(query)
        
        # permanently save data to db
        connection.commit()

        # get new user's id 
        # define SQL query to get user id
        query = f"""select id from Users where Email='{body["email"]}'"""

        # run query 
        user_id = list(cursor.execute(query))[0][0]

        # close connection to db
        connection.close()

        # create response
        response = {
            "data": {
                "user_id": user_id
            }
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 200
    except Exception as e:
        # codul pt erori 
        response = {
            "message": f"Something went wrong. Cause: {e}."
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 500

@app.route("/api/v1/authenticate", methods=["POST"])
def authenticate():
    body = request.json 

    try:
        # get existing new user 
        # open a new connection to db
        connection = sqlite3.connect("DB/User.db")

        # define SQL query to run
        query = f"""select id, Email, Password from Users where Email='{body["email"]}'"""

        # create a new cursor
        cursor = connection.cursor()

        # execute query
        user_details = list(cursor.execute(query))[0]
        
        # check if user exists
        if len(user_details) > 0:
            # check if provided password matches existing password
            if body["password"] != user_details[2]:
                response = {
                    "message": f"Password mismatch."
                }
                response = jsonify(response)
                response.headers.add("Access-Control-Allow-Origin", "*")
                return response, 400
            
            user_id = user_details[0]   

            # close connection to db
            connection.close()

            # create response
            response = {
                "data": {
                    "user_id": user_id
                }
            }
            response = jsonify(response)
            response.headers.add("Access-Control-Allow-Origin", "*")
            return response, 200
    except Exception as e:
        # codul pt erori 
        response = {
            "message": f"Something went wrong. Cause: {e}."
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 500

if __name__ == "__main__":
    app.run(debug=True, port=5501)