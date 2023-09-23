import json
import bottle
import ratings

@bottle.route('/')
def index():
    return bottle.static_file("index.html", root="")

@bottle.route('/myCode.js')
def static():
    return bottle.static_file("myCode.js", root="")

@bottle.route('/songs')
def get_chat():
    return json.dumps(ratings.get_songs())

@bottle.post('/add_song')
def add_song():
    jsonBlob = bottle.request.body.read().decode()
    content = json.loads(jsonBlob)
    ratings.add_song(content)
    return json.dumps(ratings.get_songs())

@bottle.post('/rate_song')
def rate_song():
    jsonBlob = bottle.request.body.read().decode()
    content = json.loads(jsonBlob)
    ratings.rate_song(content)
    return json.dumps(ratings.get_songs())

bottle.run(host="0.0.0.0", port=8080, debug=True)