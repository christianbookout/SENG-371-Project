import time
from get_articles import *
import yaml
import mysql.connector
import json
from utils import *



def create_investment(request):
    """Creates a new investment entry in the database"""

    ticker = request.json['ticker']
    owner = request.json['owner']
    purchased_at = request.json['purchased_at']
    purchased_price = request.json['purchased_price']
    quantity = request.json['quantity']
    query = f"INSERT INTO Investments(ticker, owner, purchased_at, purchased_price, quantity) VALUES ('{ticker}', '{owner}', '{purchased_at}', '{purchased_price}', '{quantity}');"
    result = send_query(query)
    return result


def update_investments(quantity, ticker):
    """Updates the quantity of an investment in the database"""
    query = f"UPDATE Investments SET quantity = '{quantity}' WHERE ticker = '{ticker}';"
    result = send_query(query)
    return result
    