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
    query = "DELETE FROM Users WHERE email = %s;"
    send_query(query, [email])

def test_create_existing_user(): 
    user_json = { 
        "fullname": "Test User",
        "email": "test@gmail.com",
        "password": "test1234"
    }
        
    app.test_client().post('/createUser', json=user_json)
    result = app.test_client().post('/createUser', json=user_json) 
    email = user_json['email']
    assert result.status_code == 401 

    query = "DELETE FROM Users WHERE email = %s;"
    send_query(query, [email])
