"use strict";

// Function which makes the AJAX GET request to get
// song data from the server
function getSongs(){
    ajaxGetRequest("songs", displaySongs);
}

// Function called when the server responds to our GET
// request. It updates the webpage with out latest music
// info.
function displaySongs(response){
    let songs = JSON.parse(response);
    let div_html = ""
    for (let song_id in songs) {
      let song = songs[song_id];
      div_html = div_html +  generate_song_html(song);
    }
    let songDiv = document.getElementById("songs");
    songDiv.innerHTML = div_html;
}

// Each song has song_id, title, artist, and ratings as keys
function generate_song_html(song) {
  let retVal = "<a href=\"https://www.youtube.com/watch?v=" + song.song_id + "\" target=\"_blank\">"
  retVal = retVal + song.title + " - " + song.artist + "</a><br/>";
  retVal = retVal + song.ratings + "<br/>";
  retVal = retVal + "Rate: ";
  retVal = retVal + generate_rating_buttons(song.song_id);
  retVal = retVal + "<hr/>";
  return retVal
}

function generate_rating_buttons(song_id) {
  let retVal = "";
  let array = [1, 2, 3, 4, 5]
  for(let i of array) {
    retVal = retVal + generate_button_html(song_id, i);
  }
  return retVal;
}

function generate_button_html(song_id, num) {
  let retVal = "<button onClick=\"rate(\'" + song_id + "\', " + num + ")\">"+num+"</button>";
  return retVal;
}

// Function called when we want to add a song to our list
function newSong() {
  let id_elem = document.getElementById("song_id_input");
  let song_id = get_value_and_clear(id_elem);
    
  let title_elem = document.getElementById("song_title_input");
  let title = get_value_and_clear(title_elem);
    
  let artist_elem = document.getElementById("song_artist_input")
  let artist = get_value_and_clear(artist_elem);
    
  let song = {"song_id": song_id, "title": title, "artist": artist};
  let songJSON = JSON.stringify(song);
  ajaxPostRequest("add_song", songJSON, displaySongs)
}

function get_value_and_clear(input_obj) {
  let retVal = input_obj.value;
  input_obj.value = "";
  return retVal;
}

function rate(song_id, rating){
  let songRating = {"song_id": song_id, "rating": rating};
  let ratingJSON = JSON.stringify(songRating);
  ajaxPostRequest("rate_song", ratingJSON, displaySongs)
}

function ajaxGetRequest(path, callback){
  let request = new XMLHttpRequest();
  request.onreadystatechange = function(){
    if (this.readyState === 4 && this.status === 200){
        callback(this.response);
    }
  };
  request.open("GET", path);
  request.send();
}

function ajaxPostRequest(path, data, callback){
  let request = new XMLHttpRequest();
  request.onreadystatechange = function(){
    if (this.readyState === 4 && this.status === 200){
      callback(this.response);
    }
  };
  request.open("POST", path);
  request.send(data);
}