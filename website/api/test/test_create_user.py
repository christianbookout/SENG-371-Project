from api import *
import json

def test_create_user():
    user_json = { 
        "fullname": "Test User",
        "email": "test@gmail.com",
        "password": "test1234"
    }

    result = app.test_client().post('/createUser', json=user_json)
    email = user_json['email']
    assert result is not None
    query = f"DELETE FROM Users WHERE email = '{email}';"
    send_query(query)

def test_create_existing_user(): 
    user_json = { 
        "fullname": "Test User",
        "email": "test@gmail.com",
        "password": "test1234"
    }
        
    app.test_client().post('/createUser', json=user_json)
    result = app.test_client().post('/createUser', json=user_json) 
    email = user_json['email']
    print("result: ", result)
    print("QUEEEERY IS : :: :: " + str(send_query("SELECT * FROM Users;")))
    assert result.status_code == 401 

    query = f"DELETE FROM Users WHERE email = '{email}';"
    send_query(query)
