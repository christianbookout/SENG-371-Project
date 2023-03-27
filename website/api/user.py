from flask import Flask
import mysql.connector
import json
import time
from utils import send_query
from api import db

def create_user(request):
    name = request.json.get("fullname")
    email = request.json['email'] 
    password = request.json['password']
    date = date.today()
    user = get_user(email)
    query = f"INSERT INTO Users(fullname, email, password, balance, created_at) VALUES ('{name}', '{email}', '{password}', 25000, '{date}');"
    args = (name, email, password, date)
    send_query(db, query, args)
    return user
    
def get_user(email):
    query = f"SELECT * FROM Users WHERE email='{email}';"
    result = send_query(query)
    return result