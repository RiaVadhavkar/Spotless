
import json
import requests
from config import initialize_headers, headers
import re

def check_spotify_url(url):
    pattern = r'^https?://open\.spotify\.com/album/[a-zA-Z0-9]+(\?[^/]+)?$'
    match = re.match(pattern, url)
    return match is not None

def get_spotify_data(album_url):
    global headers
    # Extract album ID from URL
    album_id = album_url.split("/")[-1]

    # Set up Spotify API endpoint URLs
    album_endpoint = f"https://api.spotify.com/v1/albums/{album_id}"
    
    # Make requests to API endpoints
    album_response = requests.get(album_endpoint, headers=headers)

    if album_response.status_code == 401:
        print("initializing headers...")
        # Access token has expired, obtain a new one
        headers = initialize_headers()
        # Make the request again with the new token
        album_response = requests.get(album_endpoint, headers=headers)
    
    # Parse JSON responses
    album_data = json.loads(album_response.text)

    # Extracting URI
    collection_uri = album_data["uri"].split(":")[-1]

    # Extract desired columns from album data 
    # Table: Collection
    album_list = [{
        "Collection_URI": collection_uri,
        "Collection_name": album_data["name"],
        "Type": album_data["album_type"],
        "Cover_image": album_data["images"][0]["url"],
        "Release_date": album_data["release_date"]
    }]

    album_genre_list = [] # Table:  Collection_Genre
    for genre in album_data['genres']:
        album_genre_list.append({
            'CG_collection_URI': album_data["uri"].split(":")[-1],
            'genre': genre
        })

    # Extract desired columns from artist data
    artist_list = [] # Table: Artist
    artist_collection_list = [] # Table: Has_Collection
    for artist in album_data['artists']:
        artist_uri = artist["uri"].split(":")[-1]
        artist_dict = {
            "Artist_URI": artist_uri,
            "Artist_name": artist["name"]
        }

        # Some bs to get the image links
        artists_img_endpoint = f"https://api.spotify.com/v1/artists/{artist_uri}"
        artists_img_response =  requests.get(artists_img_endpoint, headers=headers)
        artists_img_data = json.loads(artists_img_response.text)
        artist_dict["Image"] = artists_img_data['images'][0]['url'] if len(artists_img_data["images"]) > 0 else ""
        
        artist_list.append(artist_dict)
        artist_collection_list.append({
             'HasC_artist_URI':artist_uri,
             'HasC_collection_URI':collection_uri
        })

    # Extract desired columns from track data
    track_list = [] # Table: Track
    track_collection_list = [] # Table: Track_in_Collection
    track_artist_list = [] # Table: Has_Track
    for track in album_data['tracks']['items']:
        track_uri = track["uri"].split(":")[-1]
        track_list.append({
            "Track_URI": track_uri,
            "Track_name": track["name"],
            "Track_length": track["duration_ms"],
            "Track_no": track["track_number"]
        })
        track_collection_list.append({ 
            "TiC_track_URI": track_uri,
            "TiC_collect_URI": collection_uri
            })   
        for artist in track['artists']:
            artist_uri = artist['uri'].split(":")[-1]
            track_artist_list.append({ 
                "HasT_artist_URI": artist_uri,
                "HasT_track_URI": track_uri
            })   
        

    # Return data as a tuple of lists of dictionaries
    return album_list, album_genre_list, track_list, track_artist_list, artist_list, artist_collection_list, track_collection_list

# def authenticate_user():
#     auth_url = sp_oauth.get_authorize_url()
#     return auth_url