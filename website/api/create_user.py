import yaml
from flask import Flask
from flask_login import LoginManager, login_user, logout_user
import mysql.connector
import json
import time


# Load database credentials from db.yaml
db = yaml.load(open('db.yaml'), Loader=yaml.FullLoader)
# Connect to the database
db = mysql.connector.connect(
    host=db['mysql_host'], 
    user=db['mysql_user'], 
    password=db['mysql_password'], 
    database=db['mysql_db']
    )

def create_user(request: dict[str, str]):
    name = request.json.get("fullname")
    email = request.json['email'] 
    password = request.json['password']
    db.reconnect()
    cur = db.cursor()

    query = f"INSERT INTO Users(fullname, email, password, balance) VALUES ('{name}', '{email}', '{password}', 25000);"
    cur.execute(query)
    db.commit()
    return {"status_code": 200}

def login(request):
    db.reconnect()
    cur = db.cursor()

    email = request.json['email']
    password = request.json['password']

    query = f"SELECT * FROM Users WHERE email = '{email}' AND password = '{password}';"
    cur.execute(query)
    result = cur.fetchall()
    if len(result) == 0:
        return {"status_code": 401}
    else:
        return {"status_code": 200}