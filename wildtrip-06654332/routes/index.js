var express = require('express');
var router = express.Router();

//Tableau des trips
var travel = [
  {
    name:"Paris",
    image:"images/photo1.jpg",
    description:"Paris, capitale de la France, est une grande ville européenne et un centre mondial de l'art, de la mode, de la gastronomie et de la culture. Son paysage urbain du XIXe siècle est traversé par de larges boulevards et la Seine. Outre les monuments comme la tour Eiffel et la cathédrale gothique Notre-Dame du XIIe siècle, la ville est réputée pour ses cafés et ses boutiques de luxe bordant la rue du Faubourg-Saint-Honoré."
  },
  {
    name:"Panama",
    image:"images/photo2.jpg",
    description:"Le Panama est un pays situé sur l'isthme rattachant l'Amérique centrale et l'Amérique du Sud. Le canal de Panama, célèbre prouesse d'ingénierie, coupe cet isthme en son centre pour relier les océans Atlantique et Pacifique, créant ainsi une voie de navigation essentielle. Dans la capitale du même nom, les gratte-ciel modernes, casinos et discothèques contrastent avec les bâtiments de style colonial du quartier de Casco Viejo et la forêt tropicale du parc naturel métropolitain."
  },
  {
    name:"Bora-Bora",
    image:"images/photo3.jpg",
    description:"Bora-Bora est une petite île du Pacifique sud, située au nord-ouest de Tahiti, en Polynésie française. Entourée d'îlots de sable, appelés 'motus', et d'une eau turquoise protégée par un récif corallien, l'île est un haut lieu de la plongée sous-marine. C'est également une destination touristique prisée pour ses complexes de luxe, dont certains proposent des bungalows sur pilotis. Au centre de l'île s'élève le mont Otemanu, un volcan endormi culminant à 727 m."
  }
]
var empty_message=false;


//Route par défaut.
router.get('/', function(req, res, next) {
  res.render('index', {travel});
});

router.get('/trips', function(req, res, next) {
  res.render('trips', {travel, empty_message});
});


router.post('/card', function(req, res, next) {
  if (req.body.position) {
    var voyage = travel[req.body.position];
  }
  res.render('card', {voyage, position:req.body.position});
});

router.get('/delete-card', function(req, res, next) {
  if (req.query.position) {
    travel.splice(req.query.position, 1)
  }

  if (travel.length == 0) {
    empty_message="Il n'y aucun trip"
  }

  res.render('trips', {travel, empty_message});
});



var errorMsg = false;

router.get('/new', function(req, res, next) {
  errorMsg = false;
  res.render('new', {errorMsg})
})

router.post('/new', function(req, res, next) {
  console.log(req.body)

  var exist = false;

  for (var i = 0; i < travel.length; i++) {
    if (travel[i].name === req.body.city) {
      exist = true;
    }
  }

  if (!exist) {

    var image;
    if (req.body.city === "Paris") {
      image = "images/photo1.jpg";
    } else if (req.body.city === "Panama"){
      image = "images/photo2.jpg";
    } else {
      image = "images/photo3.jpg";
    }

    travel.push({
      name: req.body.city,
      description: req.body.description,
      image,
    })

    empty_message = false;

    res.render('trips', {travel, empty_message, errorMsg})

  } else {
    errorMsg = true;
    console.log(errorMsg);
    res.render('new', {travel, empty_message, errorMsg})
  }

})

module.exports = router;
