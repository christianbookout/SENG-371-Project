import datetime
from flask import Blueprint, request, jsonify
from utils import *

investment_api = Blueprint('investment_api', __name__)

@investment_api.route('/buyStock', methods=['POST'])
def create_investment():
    """Creates a new investment entry in the database"""

    ticker = request.json.get("ticker")
    owner = request.json.get("userId")
    purchased_at = datetime.datetime.now()
    purchased_price = request.json.get("price")
    quantity = request.json.get("quantity")

    balance = get_balance(owner)[0][0]
    if (balance < purchased_price * quantity):
        return "Insufficient funds", 400

    stock = get_investments(owner, ticker)
    if stock != []:
        update_quantity(owner, ticker, stock["quantity"] + quantity)
    else:
        add_investment(owner, ticker, quantity)

    add_transaction(owner, ticker, purchased_price, purchased_at, "buy")

    update_balance(owner, -purchased_price * quantity)
    
    return jsonify(get_investments(owner))


# update to check if they own stock before selling - throw errorish if they no own stock, sell stock otherwise
@investment_api.route('/sellStock', methods=['POST'])
def sell_investment():
    """Creates a new investment entry in the database"""

    ticker = request.json.get("ticker")
    owner = request.json.get("userId")
    sold_at = datetime.now()
    sold_price = request.json.get("price")
    quantity = request.json.get("quantity")

    owned_quantity = get_investments(owner, ticker)['quantity']
    if (owned_quantity < quantity):
        return "Insufficient shares", 400

    add_transaction(owner, ticker, sold_price, sold_at, "sell")

    # If the user sold all of their shares, delete the investment. Otherwise, just update it to reflect the new quantity
    if (owned_quantity == quantity):
        delete_investment(owner, ticker)
    else:
        update_quantity(owner, ticker, owned_quantity - quantity)

    # Increase the user's balance by the amount they sold the stock for
    update_balance(owner, sold_price * quantity)

    return get_investments(owner)

def add_investment(ownerid, ticker, quantity):
    """Adds an investment to the database"""
    query = "INSERT INTO Investments (owner, ticker, quantity) VALUES (%s, %s, %s);"
    args = (ownerid, ticker, quantity)
    send_query(query, args)

def add_transaction(ownerid, ticker, price, time, buy_sell):
    """Adds a transaction to the database"""
    query = "INSERT INTO Transactions (purchaser, ticker, price, time, buy_sell) VALUES (%s, %s, %s, %s, %s);"
    args = (ownerid, ticker, price, time, buy_sell)
    send_query(query, args)

def get_balance(ownerid):
    """Returns a user's balance from the database"""
    query = "SELECT balance FROM Users WHERE userid = %s;"
    args = [ownerid]
    return send_query(query, args)

def update_balance(ownerid, quantity):
    """Updates a user's balance in the database"""
    query = "UPDATE Users SET balance = balance + %s WHERE userid = %s;"
    args = (quantity, ownerid)
    send_query(query, args)

def delete_investment(ownerid, ticker):
    """Deletes an investment from the database"""
    query = "DELETE FROM Investments WHERE owner = %s AND ticker = %s;"
    args = (ownerid, ticker)
    send_query(query, args)

def update_quantity(ownerid, ticker, quantity):
    """Updates an investment in the database"""
    query = "UPDATE Investments SET quantity = %s WHERE owner = %s AND ticker = %s;"
    args = (quantity, ownerid, ticker)
    send_query(query, args)

def get_investments(ownerid, ticker = None):
    """Returns all investments in the database for a given user"""
    if ticker is None:
        query = "SELECT ticker, quantity FROM Investments WHERE owner = %s;"
        args = [ownerid]
    else:
        query = "SELECT ticker, quantity FROM Investments WHERE owner = %s AND ticker = %s;"
        args = (ownerid, ticker)
    
    result = send_query(query, args)
    balance = get_balance(ownerid)
    response = {"stocks": result, 
                "balance": balance}
    return response
