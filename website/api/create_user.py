import yaml
import mysql.connector
import json
import time
from utils import *



def create_user(request):
    """Creates a new user entry in the database"""

    name = request.json['fullname']
    email = request.json['email']
    password = request.json['password']
    query = f"INSERT INTO Users(fullname, email, password, balance) VALUES ('{name}', '{email}', '{password}', 25000);"
    result = send_query(query)
    return result

 