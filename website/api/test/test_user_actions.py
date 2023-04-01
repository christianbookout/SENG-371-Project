import datetime
from api.utils import send_query
import pytest
from deepdiff import DeepDiff

from api.investments import get_balance

test_email = "testuser@gmail.com"
test_username = "TestUser"
test_password = "test1234"

@pytest.fixture(scope="class")
def db():
    query = "INSERT INTO Users(fullname, email, password, balance, created_at) VALUES (%s, %s, %s, %s, %s);"
    args = [test_username, test_email, test_password, 25000, datetime.datetime.now()]
    send_query(query, args)
    yield
    # Clean up database
    send_query("DELETE FROM Users WHERE email = %s;", 
               [test_email])
    send_query("DELETE FROM Investments WHERE owner = %s;", 
               [test_email])
    send_query("DELETE FROM Transaction_history WHERE purchaser = %s;", 
               [test_email])

def do_login(client):
    login_json = {
        "email": test_email,
        "password": test_password
    }
    return client.post("/login", json=login_json)

@pytest.mark.usefixtures("db")
class TestUserActions:
    def test_login(self, client):
        result = do_login(client)
        assert result.status_code == 200, "The login returns a non-200 status code when given correct login info"
        expected_json = {
            "username": test_username,
            "email": test_email,
            "balance": 25000,
            "stocks": []
        }
        assert result.json == expected_json, "The JSON returned is not the same as expected"

    def test_user_buy_stock(self, client):
        buy_json = {
            "email": test_email,
            "ticker": "AAPL",
            "quantity": 10,
            "price": 100
        }
        result = client.post("/buyStock", json=buy_json)
        assert result.status_code == 200, "sellStock returns a non-200 status code"

        login_result = do_login(client)
        assert login_result.json["stocks"] == [["AAPL", 10]], "The stocks are not correct after buying a stock"
        assert login_result.json["balance"] == 24900, "The balance is not correct after buying a stock"

    def test_user_sell_stock(self, client):
        sell_json = {
            "email": test_email,
            "ticker": "AAPL",
            "quantity": 5,
            "price": 1000,
        }
        result = client.post("/sellStock", json=sell_json)
        assert result.status_code == 200, "sellStock returns a non-200 status code"

        login_result = do_login(client)
        assert login_result.json["stocks"] == [["AAPL", 5]], "The stocks are not correct after selling a stock"
        assert login_result.json["balance"] == 25900, "The balance is not correct after selling a stock"


    def test_user_history(self, client):
        history_json = {
            "email": test_email
        }
        result = client.post("/getHistory", json=history_json)
        assert result.status_code == 200, "getHistory returns a non-200 status code"
        expected_history = {[{
            "ticker": "AAPL",
            "quantity": 10,
            "price": 1000,
            "time": result.json[0]["time"],
            "buy_sell": "buy"
        },
        {
            "email": test_email,
            "ticker": "AAPL",
            "quantity": 5,
            "price": 1000,
            "time": result.json[1]["time"],
            "buy_sell": "sell"
        }]}
        diff = DeepDiff(result.json, expected_history, ignore_order=True)
        assert result.json == expected_history, f"The stock history is not correct after buying and selling stocks. Diff is: {diff}"


