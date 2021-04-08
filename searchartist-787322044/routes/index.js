var express = require('express');
var router = express.Router();

var Musics = [
  {
    artist: "Muse",
    favorite_musics: ["Uprising", "starlight"]
  }, {
    artist: "ACDC",
    favorite_musics: ["Thunderstruck", "Highway to Hell"]
  }, {
    artist: "Led Zeppelin",
    favorite_musics: ["Rock and Roll", "Stairway to Heaven"]
  }, {
    artist: "Doors",
    favorite_musics: ["LA Woman", "Riders on the Storm "]
  }, {
    artist: "Charles Aznavour",
    favorite_musics: ["La Boheme", "Hier encore"]
  }, {
    artist: "Jacques Brel",
    favorite_musics: ["Ne me quitte pas", "Quand on a que l'amour"]
  }, {
    artist: "Céline Dion",
    favorite_musics: ["S'il suffisait d'aimer", "Let's Talk About Love"]
  }, {
    artist: "Pink Floyd",
    favorite_musics: ["Shine On You Crazy Diamond", "Another Brick in the Wall"]
  }, {
    artist: "Edith Piaf",
    favorite_musics: ["La Vie en rose", "Non, je ne regrette rien"]
  }, {
    artist: "Beyonce",
    favorite_musics: ["Halo", "Crazy in Love"]
  }
];

router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/search', function(req, res, next) {
  if (req.body.artist && req.body.artist !== '') {
    var artist = null;

    for (var i = 0; i < Musics.length; i++) {
      if (Musics[i].artist.split(' ').join('').toLowerCase() == req.body.artist.split(' ').join('').toLowerCase()) {
        console.log('Artiste recherché : ', req.body.artist.split(' ').join('').toLowerCase())
        console.log('Artiste courrant : ', Musics[i].artist.split(' ').join('').toLowerCase())
        console.log("OK");
        artist = Musics[i];
        break; // Permet d'arrêter l'exécution de la boucle
      } else {
        console.log('Artiste recherché : ', req.body.artist.split(' ').join('').toLowerCase());
        console.log('Artiste courrant : ', Musics[i].artist.split(' ').join('').toLowerCase());
        console.log('PAS OK');
      }
    }

    res.render('search', { artist });
  } else {
    console.log('Aucun artiste reçu dans la recherche');
    res.render('search', { artist: null });
  }
});

module.exports = router;
