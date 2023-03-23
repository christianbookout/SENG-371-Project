import yaml
import mysql.connector
import json
import time
from utils import *
from api import db, app

def get_investments(ownerid, ticker="default"):
    """Returns all investments in the database for a given user"""
    if (ticker!="default"):
        query = f"SELECT ticker, quantity FROM Investments WHERE owner='{ownerid}' AND ticker='{ticker}';"
        args = {ownerid, ticker}
    else :
        query = f"SELECT ticker, quantity FROM Investments WHERE owner='{ownerid}';"
        args = {ownerid}
    result = send_query(db, query, args)
    
    get_balance = "SELECT balance FROM Users WHERE userid = %s;"
    updated_balance = send_query(db, get_balance, ownerid)
    response = {"stocks": result, "balance": updated_balance}
    return response