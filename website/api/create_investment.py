import datetime
import time
from get_articles import *
import yaml
import mysql.connector
import json
from utils import *
from api import db, app
from get_investments import *

@app.route('/buyStock', methods=['POST'])
def create_investment(request):
    """Creates a new investment entry in the database"""

    ticker = request.json.get("ticker")
    owner = request.json.get("userId")
    purchased_at = datetime.now()
    purchased_price = request.json.get("price")
    quantity = request.json.get("quantity")
    getBalance = "SELECT balance FROM Users WHERE userid = %s;"
    balance = send_query(db, getBalance, owner)
    if (balance[0][0] < purchased_price * quantity):
        return {"status_code": 400, "error": "Insufficient funds"}
    stock = get_investments(owner, ticker)
    if(stock!=None):
        updateInvestment = "UPDATE Investments SET quantity = quantity + %s WHERE owner = %s AND ticker = %s;"
        args = (quantity, owner, ticker)
        send_query(db, updateInvestment, args)
    else:
        newInvestment = "INSERT INTO Investments (owner, ticker, quantity) VALUES (%s, %s, %s);", 
        args = (owner, ticker, quantity)
        send_query(db, newInvestment, args) 

    newTransaction = "INSERT INTO Transactions (purchaser, ticker, price, time, buy_sell) VALUES (%s, %s, %s, %s, %s, 'buy');"
    args = (owner, ticker, purchased_price, purchased_at)
    send_query(db, newTransaction, args)
    updateBalance = "UPDATE Users SET balance = balance - %s WHERE userid = %s"
    args = (purchased_price * quantity, owner)
    send_query(db, updateBalance, args)
    updated_balance = send_query(db, getBalance, owner)
    getResponse = "SELECT ticker, quantity FROM Investments WHERE owner = %s;"
    updated_investments = send_query(db, getResponse, owner)
    response = {"stocks": updated_investments, "balance": updated_balance}
    return response
    

@app.route('/sellStock', methods=['POST'])  #update to check if they own stock before selling - throw errorish if they no own stock, sell stock otherwise
def sell_investment(request):
    """Creates a new investment entry in the database"""

    ticker = request.json.get("ticker")
    owner = request.json.get("userId")
    sold_at = datetime.now()
    sold_price = request.json.get("price")
    quantity = request.json.get("quantity")
    owned_quantity = get_investments(owner, ticker)
    if(owned_quantity['quantity'] < quantity):
        return {"status_code": 400, "error": "Insufficient shares"}
    new_transaction = "INSERT INTO Transactions (purchaser, ticker, price, time, buy_sell) VALUES (%s, %s, %s, %s, 'sell');"
    args = (owner, ticker, sold_price, sold_at)
    send_query(db, new_transaction, args)
    check_quantity = "SELECT quantity FROM Investments WHERE ticker = %s AND owner = %s;"
    args = (ticker, owner)
    result = send_query(db, check_quantity, args)
    if (result[0][0] == quantity):
        query = "DELETE FROM Investments WHERE ticker = %s AND owner = %s;"
        args = (ticker, owner)
        send_query(db, query, args)
    else:
        query = "UPDATE Investments SET quantity = %s WHERE ticker = %s AND owner = %s;"
        args = (result[0][0] - quantity, ticker, owner)
        send_query(db, query, args)
    update_balance = "UPDATE Users SET balance = balance + %s WHERE userid = %s"
    args = (sold_price * quantity, owner)
    send_query(db, update_balance, args)
    get_balance = "SELECT balance FROM Users WHERE userid = %s;"
    args = (owner)
    updated_balance = send_query(db, get_balance, args)
    get_response = "SELECT ticker, quantity FROM Investments WHERE owner = %s;"
    updated_investments = send_query(db, get_response, args)
    response = {"stocks": updated_investments, "balance": updated_balance}
    return response
