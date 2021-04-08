// /*****************************
//  *Création d'un nouvelle Todo*
// ******************************/
// //nous commencons par d'abord crée nos différent éléments en se basant sur ceux deja existant voir index.html
var newItem = document.createElement("div");
var h3 = document.createElement("h3");
var image = document.createElement("img");
var description = document.createElement("p");
var date = document.createElement("p");
//
// //Création des 3 valeurs d'une todo et nous les stockons dans des variables.
var newTitle = document.createTextNode("RDV client");
var newDescription = document.createTextNode("RDV STEP 1 @Eloïse");
var newDate = document.createTextNode("05/05/2019");
//
// //Nous précisons le chemin pour l'image de la nouvelle et todo et nous spécifions la class de la div parent
// //pour qu'elle puisse arriver sur la page avec le meme style que les autres
image.src = "images/meeting.svg";
newItem.classList.add("item");
//
// //on met l'image en enfant de notre h3 comme ceux déja existant
h3.appendChild(image);
//
// //on insère apres notre image le titre dans notre h3
h3.appendChild(newTitle);
//
// //puis on donne leur valeur au paragraphe de la description et de la date
description.appendChild(newDescription);
date.appendChild(newDate);
//
// //enfin on imbrique tout nos éléments dans notre div en respectant l'ordre
newItem.appendChild(h3);
newItem.appendChild(description);
newItem.appendChild(date);
//
// //on place notre nouvelle todo créer dans notre page a la suite des autres éléments
document.getElementById('main_container').appendChild(newItem);


/*********************************
 *Suppression de la première Todo*
**********************************/
//décommenter cette ligne ci dessous pour voir ce que nous retourne la commande en visant la class item
console.log("Liste de tout les item : ",document.getElementsByClassName('item'));

//Vu que nous voulons supprimer la 1er todo nous allons chercher dans toute celle existant la premiere via [0] et nous allons la supprimer avec remove().
document.getElementsByClassName('item')[0].remove();


/*********************************
 *Suppression de la dernière Todo*
**********************************/
//Meme exercise que précédemment sauf que nous ne voulons pas supprimer la première mais la dernière donc nous devons récupérer le nombre d'item total
console.log("nombre de todo sur la page : ",document.getElementsByClassName('item').length);
var compteur = document.getElementsByClassName('item').length;

//Maintenant que nous avons le nombre total nous pouvons reprendre notre commande pour supprimer
//un élément en changeant la position de [0] par le nombre récuperer donc la variable compteur -1 car on commence a 0.
document.getElementsByClassName('item')[compteur-1].remove();


/*************************
 *Modification d'une date*
**************************/
// Nous voulons modifier la date d'une todo présente par le biais d'un ID.
// Ajouter un id 'date' sur la todo que vous voulez modifier pour pouvoir coté JavaScript allez viser cette ID une fois que vous avez
// un accès à la bonne todo vous pouvez chercher la date et lui attribuer une nouvelle valeur.
//document.getElementById('date').textContent = "Modify date";
