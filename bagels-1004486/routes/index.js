var express = require('express');
var router = express.Router();

var Bagels = [
  {
    images:"bagel_bleu",
    title:"Bagel façon Bresse Bleu",
    description:"Les fans de fromage bleu vont adorer cette recette de burger aux blancs de poulet et confit d'oignons. À accompagner de pommes de terre sautées ou de frites."
  },
  {
    images:"bagel_pizza",
    title:"Bagel Pizza",
    description:"La Pizza Bagel réalise votre rêve le plus fou : une pizza à réaliser en quelques minutes avec comme base un bagel garni de sauce tomate, de jambon et de fromage. Une recette idéale pour votre prochain brunch."
  },
  {
    images:"bagel_saumon",
    title:"Bagel Saumon",
    description:"Un délicieux pain rond, ultra moelleux et grillé, garni de saumon fumé et de crème."
  }
]



router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/bagel', function(req, res, next) {
  res.render('bagel', {Bagels});
});


module.exports = router;
