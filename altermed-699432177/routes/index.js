var express = require('express');
var router = express.Router();

// set de data importé depuis les assets
var medecines = [
  {
    name: "Acupuncture",
    desc: "D'origine chinoise, application de très fines aiguilles en certains points du corps, sur le parcours de méridiens d'énergie.",
    imgUrl: "https://images.unsplash.com/photo-1512290746430-3ffb4fab31bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  },
  {
    name: "Luminothérapie",
    desc: "Traitement par l'exposition à la lumière de troubles dépressifs saisonniers.",
    imgUrl: "https://images.unsplash.com/photo-1506367861045-27937c3a8e63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80",
  },
  {
    name: "Méditation",
    desc: "Regroupe plusieurs techniques de concentration qui, en dehors de leur visée spirituelle, sont parfois utilisées à des fins de relaxation et pour lutter contre le stress",
    imgUrl: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1472&q=80",
  },
  {
    name: "Naturopathie",
    desc: "Vise à rééquilibrer ou garder le fonctionnement de l'organisme par des moyens dits « naturels » : rééquilibrage alimentaire, hygiène de vie, exercices physiques, relaxation... à tous les âges de la vie.",
    imgUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  },
  {
    name: "Phytothérapie",
    desc: "Utilisation des plantes médicinales",
    imgUrl: "https://images.unsplash.com/photo-1477511801984-4ad318ed9846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  },
  {
    name: "Reiki",
    desc: "Proche de la technique radiance : soin manuel par transmission d'énergie curative",
    imgUrl: "https://images.unsplash.com/photo-1527380992061-b126c88cbb41?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=802&q=80",
  },
  {
    name: "Shiatsu",
    desc: "Technique orientale de pression manuelle sur des points précis",
    imgUrl: "https://images.unsplash.com/photo-1500753934328-32e596b10ef1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  },
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Home',
  });
});

/* GET home page. */
router.get('/medecines', function(req, res, next) {
  res.render('medecines', {
    title: 'Liste',
    medecines
   });
});



module.exports = router;
