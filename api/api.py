import time
import db
import json
from datetime import date
from datetime import datetime
from flask import Flask, jsonify
from flask_mysqldb import MySQL
app = Flask(__name__, static_folder="../build", static_url_path='/')

# mysql.connection.commit() do if inserting into database, or posting

# Configure db
app.config['MYSQL_HOST'] = db.mysql_host
app.config['MYSQL_USER'] = db.mysql_user
app.config['MYSQL_PASSWORD'] = db.mysql_password
app.config['MYSQL_DB'] = db.mysql_db

mysql = MySQL(app)

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')
    
class JsonExtendEncoder(json.JSONEncoder):
  def default(self, o):
    if isinstance(o, bytes) or isinstance(o, bytearray):
      return o.decode()
    elif isinstance(o, datetime):
      return o.strftime('%Y-%m-%d %H:%M:%S')
    elif isinstance(o, date):
      return o.strftime('%Y-%m-%d')
    else:
      return json.JSONEncoder.default(self, o)

def get_json_from_query(sql_statement):
  cur = mysql.connection.cursor()
  cur.execute(sql_statement)

  rows = cur.fetchall()
  row_headers = [x[0] for x in cur.description]
  json_res = [dict(zip(row_headers, row)) for row in rows]

  cur.close()
  return json.dumps(json_res, cls=JsonExtendEncoder)

@app.route('/')
def index():
  return app.send_static_file('index.html')

@app.route('/api/albums')
def get_albums():
  json_str = get_json_from_query("SELECT * FROM album")
  return json_str

@app.route('/api/image')
def get_images():
  json_str = get_json_from_query("SELECT * FROM image")
  return json_str

@app.route('/api/time')
def get_current_time():
  return {'time': time.time()}
