import yaml
import mysql.connector
import json
import time
from utils import *
from api import db, app


@app.route('/createUser', methods=['POST'])
def create_user(request):
    """Creates a new user entry in the database"""

    name = request.json['fullname']
    email = request.json['email']
    password = request.json['password']
    date = date.today()
    query = "INSERT INTO Users(fullname, email, password, balance, created_at) VALUES (%s, %s, %s 25000, %s);"
    args = (name, email, password, date)
    result = send_query(db, query, args)
    return result

 