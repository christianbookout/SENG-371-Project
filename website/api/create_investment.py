import datetime
import time
from get_articles import *
import yaml
import mysql.connector
import json
from utils import *
from api import db, app

@app.route('/buyStock', methods=['POST'])
def create_investment(request):
    """Creates a new investment entry in the database"""

    ticker = request.json['ticker']
    owner = request.json['owner']
    purchased_at = datetime.now()
    purchased_price = request.json['purchased_price']
    quantity = request.json['quantity']
    query = "INSERT INTO Investments (owner, ticker, purchased_at, purchase_price, quantity) VALUES (%s, %s, %s, %s, %s)", 
    args = (owner, ticker, purchased_at, purchased_price, quantity)
    send_query(db, query, args)
    return "", 200

@app.route('/updateStock', methods=['PATCH'])
def update_investments(quantity, ticker):
    """Updates the quantity of an investment in the database"""
    query = "UPDATE Investments SET quantity = %s WHERE ticker = %s"
    args = (quantity, ticker)
    result = send_query(db, query, args)
    return result
    