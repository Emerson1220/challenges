//PROPOSITION DE CORRECTION POUR LE PENDU NON OPTIMISE AVEC DES FONCTIONS

//L'utilisateur peut entrer un mot et le valider. On pose une écoute à la validation du mot
document
  .getElementById("buttonValidation")
  .addEventListener("click", function() {
    // On met le mot en majusule et on le transforme en tableau
    var wordToGuess = document.getElementById("secretWord").value.toUpperCase();
    var lettreTable = wordToGuess.split("");

    // BONUS Vérifie si c'est bien uniquement des lettres et non un caractère spécial ou un chiffre
    var letterCheck = lettreTable.filter(function(letter) {
      if (letter.toUpperCase() === letter.toLowerCase()) {
        return true;
      }
    });
    if (letterCheck.length > 0) {
      // Si le mot contient un chiffre ou un caractère spé. on affiche un message d'alerte
      document.getElementById("flashMessage").textContent =
        "Le mot ne doit pas contenir de chiffres ou caractères spéciaux";
    } else {
      // On masque l'écran de base et on passe à l'écran de jeu
      document.getElementById("firstScreen").style.display = "none";
      document.getElementById("playScreen").style.display = "block";

      // On crée un élément <p></p> avec un underscore => _ pour chaque lettre à trouver
      for (var i = 0; i < lettreTable.length; i++) {
        var underscore = document.createElement("p");
        underscore.className = "underscore";
        underscore.textContent = "_";
        document.getElementById("underscoresWrapper").appendChild(underscore);
      }

      // Le second joueur peut entrer une lettre et la valider
      // On va poser une écoute sur la validation
      document
        .getElementById("letterInputValidation")
        .addEventListener("click", function() {
          // On met la lettre en majuscule
          var letterInput = document
            .getElementById("letterInput")
            .value.toUpperCase();

          // On boucle sur le tableau pour vérifier si la lettre appartient au mot
          var isAGoodLetter;
          for (var i = 0; i < lettreTable.length; i++) {
            if (lettreTable[i] === letterInput) {
              isAGoodLetter = true;
              break;
            } else {
              isAGoodLetter = false;
            }
          }

          // CAS 1 On trouve la bonne lettre
          if (isAGoodLetter) {
            // On remplace la ou les underscores par la bonne lettre
            for (var i = 0; i < lettreTable.length; i++) {
              if (lettreTable[i] === letterInput) {
                document.getElementsByClassName("underscore")[
                  i
                ].textContent = letterInput.toUpperCase();
              }
            }

            // On vérifie s'il y a toujours des lettres à trouver sinon la partie est terminée
            var underscoreRemaining = false;
            for (
              var i = 0;
              i < document.getElementsByClassName("underscore").length;
              i++
            ) {
              if (
                document.getElementsByClassName("underscore")[i].textContent ==
                "_"
              ) {
                // UnderscoreRemaining est égale à false, on le passe à true pour signaler qu'il reste des lettres à découvrir
                underscoreRemaining = true;
                break;
              }
            }

            // S'il reste des lettre à découvrir, on continue
            if (underscoreRemaining) {
              document.getElementById("letterInput").value = "";

              //S'il n'y a plus de lettre à découvre
            } else {
              // On a deviné toutes les lettre le joueur à trouvé le mot
              document.getElementById("playScreen").style.display = "none";
              document.getElementById("result").textContent = "Tu a gagné!";
              document.getElementById("result").style.display = "block";
            }
          } else {
            // on enlève un point
            var userPoints = document.getElementById("userPoints").textContent;
            var newUserPoints = userPoints - 1;
            document.getElementById("userPoints").textContent = newUserPoints;
            document.getElementById("letterInput").value = "";

            // On vérifie si le joueur n'a plus de point. Il a perdu
            if (newUserPoints == 0) {
              document.getElementById("playScreen").style.display = "none";
              document.getElementById("result").textContent = "Tu a perdu!";
              document.getElementById("result").style.display = "block";
            }
          }
        });
    }
  });
