import yaml
import mysql.connector
import json
import time
from utils import *


def get_user(name="default", email="default"):

    if (name!="default"):
        query = f"SELECT * FROM Users WHERE fullname='{name}';"

    elif (email!="default"):
        query = f"SELECT * FROM Users WHERE email='{email}';"

    result = send_query(query)
    return result
