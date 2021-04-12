import time
import os
import json
import keys

import pymysql.cursors
import boto3
import jwt
import hashlib

from datetime import date, datetime, timedelta
from flask import Flask, jsonify, request, make_response, session
from flask_cors import CORS
from werkzeug.utils import secure_filename
from functools import wraps

app = Flask(__name__)
app.config['SECRET_KEY'] = 'c6e26331f9f945dca55694ac0fdd9227'

CORS(app)

# mysql.connection.commit() do if inserting into database, or posting

# Configure db
connection = pymysql.connect(host=keys.mysql_host,
                            user=keys.mysql_user,
                            password=keys.mysql_password,
                            database=keys.mysql_db,
                            cursorclass=pymysql.cursors.DictCursor) 

s3 = boto3.client('s3',
                  aws_access_key_id=keys.aws_access_key_id,
                  aws_secret_access_key=keys.aws_secret_access_key)
    
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
  with connection.cursor() as cursor:
    cursor.execute(sql_statement)
    rows = cursor.fetchall()
    row_headers = [x[0] for x in cursor.description]
    json_res = [dict(zip(row_headers, row)) for row in rows]

  return json_res

def insert_query(sql_statement, params):
  with connection.cursor() as cursor:
    cursor.execute(sql_statement, params)

  connection.commit()

def md5_sha_hash(str_to_hash):
  return hashlib.md5(str_to_hash.encode('utf-8')).hexdigest()

def token_required(func):
  @wraps(func)
  def decorated(*args, **kwargs):
    token = request/args.get('token')
    if not token:
      return jsonify({'Alert!': 'Token is missing!'})
    try:
      payload = jwt.decode(token, app.config['SECRET_KEY'])
    except:
      return jsonify({'Alert!': 'Invalid Token!'})
  return decorated

@app.route('/')
def test():
  return "This returns something!"

@app.route('/api/login', methods=['POST'])
def login():
  query_login = get_json_from_query('SELECT * FROM users WHERE userName="{}" && password="{}'.format(request.form['username'], md5_sha_hash(request.form['password'])))
  if query_login:

    userType = get_json_from_query('SELECT isMusician FROM users WHERE userName="{}"'.format(request.form['username']))

    token = jwt.encode({
      'user': request.form['username'],
      'expiration': str(datetime.utcnow() + timedelta(minutes=30)),
      'type': userType
    }, app.config['SECRET_KEY'])

    return jsonify({'token': token.decode('utf-8')}) 
  else:
    return make_response('Unable to verify', 403, {'WWW-Authenticate': 'Basic realm: "Authentication failed!"'})

@app.route('/api/register', methods=['POST'])
def register():
  query_username = get_json_from_query('SELECT * FROM users WHERE userName="{}"'.format(request.form['username']))
  if query_username:
    return make_response('Username taken!', 403)

  params = {
    'firstName': request.form['firstName'],
    'lastName': request.form['lastName'],
    'email': request.form['email'],
    'username': request.form['username'],
    'password': md5_sha_hash(request.form['password']),
    'userType': True if request.form['userType'] == 'musician' else False
  }

  query = """INSERT INTO users (firstName, lastName, email, userName, password, isMusician)
    VALUES (%(firstName)s, %(lastName)s, %(email)s, %(username)s, %(password)s, %(userType)s)"""

  insert_query(query, params)
  return "Success!"

@app.route('/api/time')
def get_current_time():
  return {'time': time.time()}

@app.route('/api/albums')
def get_albums():
  json_str = get_json_from_query("SELECT * FROM album")
  return json.dumps(json_str, cls=JsonExtendEncoder)

@app.route('/api/image')
def get_images():
  json_str = get_json_from_query("SELECT * FROM image")
  return json.dumps(json_str, cls=JsonExtendEncoder)

@app.route('/api/music', methods=['POST', 'GET'])
def music_endpoint():
  if request.method == 'POST':
    if 'mp3File' not in request.files:
      return "Error: No music file selected", 400

    if 'jpgFile' not in request.files:
      return "Error: No jpg selected", 400

    songName = request.values['songName'] if 'songName' in request.values else 'NoName'
    mp3File = request.files['mp3File']
    jpgFile = request.files['jpgFile'] 
    contributors = request.values['contributors']

    print(mp3File, jpgFile)
    
    return "Success?"
    # if img and img.filename != '':
    #   filename = secure_filename(img.filename)
    #   img.save(filename)

    #   s3.upload_file(filename, keys.s3_bucket_name, "abc/filename")

    #   return "test"
  if request.method == 'GET':
    return 

  return 'Success'
