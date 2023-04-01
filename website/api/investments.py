import datetime
from flask import Blueprint, request, jsonify
from utils import *

investment_api = Blueprint('investment_api', __name__)

@investment_api.route('/buyStock', methods=['POST'])
def create_investment():
    """Creates a new investment entry in the database"""

    ticker = request.json.get("ticker")
    owner = request.json.get("email")
    purchased_at = datetime.datetime.now()
    purchased_price = request.json.get("price")
    quantity = request.json.get("quantity")

    balance = get_balance(owner)
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
    owner = request.json.get("email")
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

def update_transaction_history(email, ticker, quantity, price, time, buy_sell):
    """Updates the transaction history in the database"""
    pass

def add_investment(email, ticker, quantity):
    """Adds an investment to the database"""
    query = "INSERT INTO Investments (owner, ticker, quantity) VALUES (%s, %s, %s);"
    args = (email, ticker, quantity)
    send_query(query, args)

def add_transaction(email, ticker, price, time, buy_sell):
    """Adds a transaction to the database"""
    query = "INSERT INTO Transactions (purchaser, ticker, price, time, buy_sell) VALUES (%s, %s, %s, %s, %s);"
    args = (email, ticker, price, time, buy_sell)
    send_query(query, args)

def get_balance(email):
    """Returns a user's balance from the database"""
    query = "SELECT balance FROM Users WHERE email = %s;"
    args = [email]
    return float(send_query(query, args)[0][0])

def update_balance(email, quantity):
    """Updates a user's balance in the database"""
    query = "UPDATE Users SET balance = balance + %s WHERE email = %s;"
    args = (quantity, email)
    send_query(query, args)

def delete_investment(email, ticker):
    """Deletes an investment from the database"""
    query = "DELETE FROM Investments WHERE owner = %s AND ticker = %s;"
    args = (email, ticker)
    send_query(query, args)

def update_quantity(email, ticker, quantity):
    """Updates an investment in the database"""
    query = "UPDATE Investments SET quantity = %s WHERE owner = %s AND ticker = %s;"
    args = (quantity, email, ticker)
    send_query(query, args)

def get_investments(email, ticker = None):
    """Returns all investments in the database for a given user"""
    if ticker is None:
        query = "SELECT ticker, quantity FROM Investments WHERE owner = %s;"
        args = [email]
    else:
        query = "SELECT ticker, quantity FROM Investments WHERE owner = %s AND ticker = %s;"
        args = (email, ticker)
    
    result = send_query(query, args)
    print("get_investments returns " + str(result))
    return result
    
