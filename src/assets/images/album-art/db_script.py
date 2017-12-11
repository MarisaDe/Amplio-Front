import json
import sys
from pprint import pprint
import requests
import os
from os import system

with open('../dump.json') as data_file:
	data = json.load(data_file)

artists = {}
counter = 0
list = []
albums_art = []
image_names = []
art_size = '340'

for artist in data:
	artist_dict = {}
	
	artist_name = artist['name']

	if artist_name != "ac/dc":
		continue

	artist_dict['name'] = artist_name
	artist_dict['bibliography'] = ''
	#artist_dict['label'] = None
	artist_json = json.dumps(artist_dict)
	#pprint(artist_json)
	artists[counter] = artist_json
	list.append(artist_json)
	albums = artist['albums']

	for album in albums:
		album_name = album['album']
		album_songs = album['songs']['items']
		songs_count = 0
		if album_name not in albums_art:
			albums_art.append(album_name)
			image_name = artist_name.replace('/','@') + "-" + album_name + ".jpg"
			image_name = image_name.replace(' ', '\ ')
			image_name = '"' + artist_name + '-' + album_name + '.jpg"'
			cmd = 'sacad ' + '"' + artist_name + '"' + ' ' + '"' + album_name + '"' + ' ' + art_size + ' ' + image_name
			image_names.append(image_name)
			print(cmd)
			system(cmd)
	
	# 		#print(PyLyrics.getLyrics(artist_name,song_name))
	#r = requests.post(url, data=artist_json)
	counter += 1
	#pprint(artist_json.replace('\'',''))

pprint(image_names)