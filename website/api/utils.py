from db import get_db

db = get_db()

def send_query(query, args):
    """Sends a query to the database and returns the result as a list of tuples"""
    db.reconnect()
    cur = db.cursor()
    try:
        cur.execute(query, args)
        if(query.search("INSERT")!= -1 or query.search("UPDATE") != -1):
            return "", 200
        elif(query.search("SELECT") != -1):
            result = cur.fetchall()
            return list(result)
    except:
        return 0
