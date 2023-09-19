from dotenv import load_dotenv
import os
import requests
import json
from app import app
from flaskext.mysql import MySQL
from flask_login import LoginManager, UserMixin

mysql = MySQL()

load_dotenv()

# MySQL Configurations
app.secret_key = os.getenv('app_key')
app.config['MYSQL_DATABASE_USER'] = os.getenv('SPOTLESS_USER')
app.config['MYSQL_DATABASE_PASSWORD'] = os.getenv('SPOTLESS_PASS')
app.config['MYSQL_DATABASE_DB'] = os.getenv('SPOTLESS_DB')
app.config['MYSQL_DATABASE_HOST'] = os.getenv('SPOTLESS_HOST')
app.config['images_dir'] = os.getenv('IMAGES_DIR')

login_manager = LoginManager()

mysql.init_app(app)
login_manager.init_app(app)

with open('queries.json', 'r') as file:
    queries = json.load(file)

# Spotify Configurations
def initialize_headers():
    # authorization URL to gain access to the Spotify API
    AUTH_URL = 'https://accounts.spotify.com/api/token'


    # def initialize_headers():

    # POST to get Spotify access token 
    auth_response = requests.post(AUTH_URL, {
        'grant_type': 'client_credentials',
        'client_id': os.getenv('CLIENT_ID'), # Spotify integration ID
        'client_secret': os.getenv('CLIENT_SECRET'), # Spotify integration secret
        "expires_in": 3600
    })

    # convert the response to JSON
    auth_response_data = auth_response.json()

    # save the access token
    access_token = auth_response_data['access_token']
    # headers to request anything in the Spotify API 
    headers = {
        'Authorization': 'Bearer {token}'.format(token=access_token)
    }
    return headers

headers = initialize_headers()

    
# scopes = [
#     'user-read-private'
# ]
# sp_oauth = SpotifyOAuth(client_id=os.getenv('CLIENT_ID'), 
#                         client_secret=os.getenv('CLIENT_SECRET'),
#                         redirect_uri=os.getenv('REDIRECT_URI'), 
#                         scope=scopes)