var express = require('express');
var router = express.Router();

const stripe = require('stripe')('sk_test_dR33tXRXN7n4cCfrkxEZKBis00ginBDyGz');

var dataBike = [
  {name:"BIK045", url:"/images/bike-1.jpg", price:679, mea:true},
  {name:"ZOOK07", url:"/images/bike-2.jpg", price:999, mea:true},
  {name:"TITANS", url:"/images/bike-3.jpg", price:799, mea:false},
  {name:"CEWO", url:"/images/bike-4.jpg", price:1300, mea:true},
  {name:"AMIG039", url:"/images/bike-5.jpg", price:479, mea:false},
  {name:"LIK099", url:"/images/bike-6.jpg", price:869, mea:true},
]

// *** Ces fonctions devront être déplacées dans un module à exporter ***

// Fonction qui crée la session sur stripe
var sendToStripe = async (dataCardBike,montantFraisPort) => {
  var stripeCard = [];

  for(var i=0;i<dataCardBike.length;i++){
    stripeCard.push({
      name: dataCardBike[i].name,
      amount: dataCardBike[i].price * 100,
      currency: 'eur',
      quantity: dataCardBike[i].quantity,
    })
  }

  //Si frais de port, on push dans Stripe comme un produit
  if(montantFraisPort>0){
    stripeCard.push({
      name: 'Frais de port',
      amount: montantFraisPort * 100,
      currency: 'eur',
      quantity: 1,
    })
  }

    console.log(stripeCard)

  var sessionStripeID;

  if(stripeCard.length>0){
    var session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: stripeCard,
      success_url: 'http://127.0.0.1:3000/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://127.0.0.1:3000/',
    });

    sessionStripeID = session.id;
  
  }

  return sessionStripeID
}

// Fonction qui calcule les frais de port et le total de la commande
var calculTotalCommande = (dataCardBike) => {
  var nbProduits = 0
  var totalCmd = 0

  for(var i = 0; i< dataCardBike.length; i++){
    nbProduits += dataCardBike[i].quantity
    totalCmd += dataCardBike[i].quantity * dataCardBike[i].price
  }
  var montantFraisPort = nbProduits * 30

  if(totalCmd>4000){
    montantFraisPort = 0
  } else if(totalCmd>2000){
    montantFraisPort = montantFraisPort / 2
  }

  totalCmd += montantFraisPort

  return {montantFraisPort,totalCmd}
}

//Fonction qui récupère les 3 produits à mettre en avant
var getMeaList = (dataBike) => {
  dataBike.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  dataBike = dataBike.filter(a => a.mea === true);
  dataBike = dataBike.slice(0,3)
  console.log(dataBike)
  return dataBike
}


/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.session.dataCardBike == undefined){
    req.session.dataCardBike = []
  }

  var mea = getMeaList(dataBike)
  
  res.render('index', {dataBike:dataBike, mea});
});


router.get('/shop', async function(req, res, next) {

  var total = calculTotalCommande(req.session.dataCardBike)
  //Calcul des frais de port
  var montantFraisPort = total.montantFraisPort

  //Calcul total commande
  var montantCommande = total.totalCmd
  
  // On enregistre le panier dans une session de Stripe
  var sessionStripeID = await sendToStripe(req.session.dataCardBike,montantFraisPort)

  res.render('shop', {dataCardBike:req.session.dataCardBike, sessionStripeID, montantFraisPort, montantCommande});
});


router.get('/add-shop', async function(req, res, next) {
  var alreadyExist = false;

  for(var i = 0; i< req.session.dataCardBike.length; i++){
    if(req.session.dataCardBike[i].name == req.query.bikeNameFromFront){
      req.session.dataCardBike[i].quantity = req.session.dataCardBike[i].quantity + 1;
      alreadyExist = true;
    }
  }

  if(alreadyExist == false){
    req.session.dataCardBike.push({
      name: req.query.bikeNameFromFront,
      url: req.query.bikeImageFromFront,
      price: req.query.bikePriceFromFront,
      quantity: 1
    })
  }

  res.redirect('/shop')

});



router.get('/delete-shop', async function(req, res, next){
  
  req.session.dataCardBike.splice(req.query.position,1)

  res.redirect('/shop')
})

router.post('/update-shop', async function(req, res, next){
  
  var position = req.body.position;
  var newQuantity = req.body.quantity;

  req.session.dataCardBike[position].quantity = Number(newQuantity);

  res.redirect('/shop')
})

router.get('/success', function(req, res, next){
  res.render('confirm');
})

module.exports = router;
