import yaml
import mysql.connector
import json
import time
from utils import *
from api import db, app


def get_user(name="default", email="default"):

    if (name!="default"):
        query = "SELECT * FROM Users WHERE fullname= %s;"
        args = (name)
    elif (email!="default"):
        query = "SELECT * FROM Users WHERE email= %s;"
        args = (email)
    result = send_query(db, query, args)
    return result
