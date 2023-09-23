import csv

songs_filename = "songs.csv"
ratings_filename = "ratings.csv"

def get_songs():
    songs = {}
    with open(songs_filename) as fileData:
        reader = csv.reader(fileData)
        for row in reader:
            song_id = row[0]
            title = row[1]
            artist = row[2]
            songs[song_id] = {
                "song_id": song_id,
                "title": title,
                "artist": artist,
                "ratings": []
            }
    with open(ratings_filename) as fileData:
        reader = csv.reader(fileData)
        for row in reader:
            song_id = row[0]
            rating = int(row[1])
            if song_id in songs:
                song = songs[song_id]
                song["ratings"].append(rating)
    return songs


def add_song(song):
    #{"song_id": song_id, "title": title, "artist": artist}
    songs = get_songs()
    if 'song_id' in song and 'title' in song and 'artist' in song:
        if len(song['song_id']) == 11 and song['song_id'] not in songs and \
          song['title'] != "" and song['artist'] != "":
            with open(songs_filename, "a") as csvFile:
                writer = csv.writer(csvFile)
                writer.writerow(
                    [song['song_id'], song['title'], song['artist']])
                csvFile.close()


def rate_song(song_rating):
    #{"song_id": song_id, "rating": rating}
    songs = get_songs()
    if 'song_id' in song_rating and 'rating' in song_rating:
        if song_rating['song_id'] in songs and \
           song_rating['rating'] in [1, 2, 3, 4, 5]:
            with open(ratings_filename, "a") as csvFile:
                writer = csv.writer(csvFile)
                writer.writerow(
                    [song_rating['song_id'], song_rating['rating']])
                csvFile.close()
