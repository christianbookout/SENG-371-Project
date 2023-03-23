import yaml
import mysql.connector
import json
import time
from utils import *

def get_investments(ownerid, ticker="default"):
    """Returns all investments in the database for a given user"""
    if (ticker!="default"):
        query = f"SELECT * FROM Investments WHERE owner='{ownerid}' AND ticker='{ticker}';"
    else :
        query = f"SELECT * FROM Investments WHERE owner='{ownerid}';"
    
    result = send_query(query)
    return result