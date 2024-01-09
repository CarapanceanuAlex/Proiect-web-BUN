from flask import Flask, request, jsonify, redirect, url_for
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DATABASE = r'C:\Users\Alex\Documents\GitHub\PROIECT\DB\BD Proiect WEB.db'

def connect_db():
    return sqlite3.connect(DATABASE)

@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        with connect_db() as connection:
            cursor = connection.cursor()
            cursor.execute('INSERT INTO Users (UserEmail, UserPassword) VALUES (?, ?)', (email, password))
            connection.commit()

        return jsonify({'message': 'User registered successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/signin', methods=['POST'])
def signin():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        with connect_db() as connection:
            cursor = connection.cursor()
            cursor.execute('SELECT * FROM Users WHERE UserEmail = ? AND UserPassword = ?', (email, password))
            user = cursor.fetchone()

        if user is None:
            return jsonify({'error': 'Incorrect email or password'}), 401

        # If login is successful, redirect to main.html
        return redirect(url_for('main_page'))

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/main')
def main_page():
    return jsonify({'message': 'Welcome to the main page!'}), 200

if __name__ == '__main__':
    app.run(debug=True)
