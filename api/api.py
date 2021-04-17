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
from mutagen.mp3 import MP3

app = Flask(__name__)
app.config['SECRET_KEY'] = keys.secret_key

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
    # print(rows)
    # row_headers = [x[0] for x in cursor.description]
    # json_res = [dict(zip(row_headers, row)) for row in rows]

  return rows

def get_last_insert_id():
  return get_json_from_query('SELECT LAST_INSERT_ID();')[0]['LAST_INSERT_ID()']

def update_query(sql_statement, params):
  with connection.cursor() as cursor:
    cursor.execute(sql_statement, params)

  connection.commit()

def md5_sha_hash(str_to_hash):
  return hashlib.md5(str_to_hash.encode('utf-8')).hexdigest()

def token_required(func):
  @wraps(func)
  def decorated(*args, **kwargs):
    token = request.values.get('token')
    if not token:
      return jsonify({'Alert!': 'Token is missing!'}), 403
    try:
      payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
    except:
      return jsonify({'Alert!': 'Invalid Token!'}), 403
    return func(*args, **kwargs)

  return decorated

@app.route('/', methods=['GET'])
def index():
  return "This returns something!"

@app.route('/api/test', methods=['GET'])
def test():
  print(get_json_from_query("SELECT * FROM songs"))
  return "testing..."

@app.route('/api/login', methods=['POST'])
def login():
  query_login = get_json_from_query('SELECT * FROM User WHERE username="{}" && password="{}"'.format(request.form['username'], md5_sha_hash(request.form['password'])))
  if query_login:

    userType = get_json_from_query('SELECT isMusician FROM User WHERE username="{}"'.format(request.form['username']))
    token = jwt.encode({
      'username': request.form['username'],
      'expiration': str(datetime.utcnow() + timedelta(minutes=30)),
      'type': userType
    }, app.config['SECRET_KEY'])
    return {'token': token}
  else:
    return make_response('Unable to verify', 403, {'WWW-Authenticate': 'Basic realm: "Authentication failed!"'})

@app.route('/api/register', methods=['POST'])
def register():
  query_username = get_json_from_query('SELECT * FROM User WHERE userName="{}"'.format(request.form['username']))
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

  query = """INSERT INTO User (firstName, lastName, email, userName, password, isMusician)
    VALUES (%(firstName)s, %(lastName)s, %(email)s, %(username)s, %(password)s, %(userType)s)"""

  update_query(query, params)
  return "Success!"

@app.route('/api/time', methods=['POST', 'GET'])
def get_current_time():
  return {'time': time.time()}

@app.route('/api/albums')
@token_required
def get_albums():
  json_str = get_json_from_query("SELECT * FROM album")
  return json.dumps(json_str, cls=JsonExtendEncoder)

@app.route('/api/image')
@token_required
def get_images():
  json_str = get_json_from_query("SELECT * FROM image")
  return json.dumps(json_str, cls=JsonExtendEncoder)

def upload_file(file, url):
  filename = secure_filename(file.filename)
  # img.save(filename)
  s3.upload_fileobj(file, keys.s3_bucket_name, url)

def get_song_url(id, name):
  return '/{}/{}/{}'.format('songs', id, name)

def get_image_url(id, name):
  return '/{}/{}/{}'.format('images', id, name)

@app.route('/api/music', methods=['POST', 'GET'])
@token_required
def music_endpoint():
  if request.method == 'POST':
    if 'mp3File' not in request.files:
      return "Error: No music file selected", 400

    if 'jpgFile' not in request.files:
      return "Error: No jpg selected", 400

    try:
      # Setting up files
      mp3File = request.files['mp3File']
      jpgFile = request.files['jpgFile'] 
      songName = request.form['songName'] if request.form['songName'] != '' else mp3File.filename
      audio_info = MP3(mp3File).info

      # Uploading song to dbms and s3 storage
      songs_params = {
        'songName': songName,
        'songLength': audio_info.length,
        'collaborators': request.form['contributors'],
        'songURL': 'placeholder'
      }

      songs_query = """INSERT INTO Song (songName, songLength, collaborators, songURL)
        VALUES (%(songName)s, %(songLength)s, %(collaborators)s, %(songURL)s);"""
      update_query(songs_query, songs_params)

      song_id = get_last_insert_id()
      mp3_url = get_song_url(song_id, mp3File.filename)
      upload_file(mp3File, mp3_url)
      
      # Uploading image to dbms and s3 storage
      image_params = { 'imageURL': 'placeholder' }
      image_query = "INSERT INTO Image (imageURL) VALUES (%(imageURL)s);"

      update_query(image_query, image_params)

      image_id = get_last_insert_id()
      image_url = get_image_url(image_id, jpgFile.filename)
      upload_file(jpgFile, image_url)

      # Updating urls and foreign keys within db
      song_update_params = { 'songURL': mp3_url, 'imageID': image_id, 'songID': song_id }
      image_update_query = """UPDATE Song SET songURL = %(songURL)s, imageID = %(imageID)s
        WHERE songID = %(songID)s;
      """
      update_query(image_update_query, song_update_params)

      image_update_params = { 'imageURL': image_url, 'imageID': image_id }
      image_update_query = """UPDATE Image SET imageURL = %(imageURL)s
        WHERE imageID = %(imageID)s;
      """
      update_query(image_update_query, image_update_params)
      
      return "Successfully uploaded music!"
    except Exception as e:
      print(e)
      return jsonify({'Alert!': 'Error somewhere!'}), 400

  if request.method == 'GET':
    try:
      json_str = get_json_from_query("""
        SELECT Song.*, Image.imageURL
        FROM Song INNER JOIN Image
        ON Song.imageID = Image.imageID;
      """)
      return json.dumps(json_str, cls=JsonExtendEncoder)
    except Exception as e:
      print(e)
      return jsonify({'Alert!': 'Error somewhere!'}), 400

  return 'Success'
