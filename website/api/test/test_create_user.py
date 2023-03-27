

from utils import send_query

def test_create_user(client):
    user_json = { 
        "fullname": "Test User",
        "email": "test@gmail.com",
        "password": "test1234",
        "balance": 1000
    }

    result = client.post('/createUser', json=user_json)
    assert result is not None
    email = user_json['email']
    query = "DELETE FROM Users WHERE email = %s;"
    send_query(query, [email])


def test_create_existing_user(client): 
    user_json = { 
        "fullname": "Test User",
        "email": "test@gmail.com",
        "password": "test1234",
        "balance": 1000
    }
        
    client.post('/createUser', json=user_json)
    result = client.post('/createUser', json=user_json) 
    assert result.status_code == 404

    email = user_json['email']
    query = "DELETE FROM Users WHERE email = %s;"
    send_query(query, [email])