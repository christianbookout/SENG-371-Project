from api import *
import json

def test_create_user():
    user_json = { 
        "fullname": "Test User",
        "email": "test@gmail.com",
        "password": "test1234"
    }

    app.test_client().post('/createUser', json=user_json)
    fullname = user_json["fullname"]
    email = user_json['email']
    result = app.test_client().get('/getUser/' + fullname + '/' + email)
    assert result != None
    query = f"DELETE FROM Users WHERE email = '{email}';"
    send_query(query)



