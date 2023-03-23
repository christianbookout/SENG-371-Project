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
    query = "INSERT INTO Investments (owner, ticker, quantity) VALUES (%s, %s, %s);", 
    args = (owner, ticker, quantity)
    send_query(db, query, args) 
    query = "INSERT INTO Transactions (purchaser, ticker, price, time, buy_sell) VALUES (%s, %s, %s, %s, %s, 'buy');"
    args = (owner, ticker, purchased_price, purchased_at)
    send_query(db, query, args)
    return "", 200

@app.route('/updateStock', methods=['PATCH'])
def update_investments(request):
    """Updates the quantity of an investment in the database"""
    
    quantity = request.json['quantity']
    ticker = request.json['ticker']
    query = "UPDATE Investments SET quantity = %s WHERE ticker = %s"
    args = (quantity, ticker)
    send_query(db, query, args)
    return "", 200
    
@app.route('/sellStock', methods=['POST'])
def sell_investment(request):
    """Creates a new investment entry in the database"""

    ticker = request.json['ticker']
    owner = request.json['owner']
    sold_at = datetime.now()
    sold_price = request.json['sold_price']
    quantity = request.json['quantity']
    query = "INSERT INTO Transactions (purchaser, ticker, price, time, buy_sell) VALUES (%s, %s, %s, %s, 'sell');"
    args = (owner, ticker, sold_price, sold_at)
    send_query(db, query, args)
    query = "SELECT quantity FROM Investments WHERE ticker = %s AND owner = %s;"
    args = (ticker, owner)
    result = send_query(db, query, args)
    if (result[0][0] == quantity):
        query = "DELETE FROM Investments WHERE ticker = %s AND owner = %s;"
        args = (ticker, owner)
        send_query(db, query, args)
    else:
        query = "UPDATE Investments SET quantity = %s WHERE ticker = %s AND owner = %s;"
        args = (result[0][0] - quantity, ticker, owner)
        send_query(db, query, args)
    return "", 200