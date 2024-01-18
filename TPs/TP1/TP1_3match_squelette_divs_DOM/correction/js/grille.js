import Cookie from './cookie.js';
import { create2DArray } from "./utils.js";

/* Classe principale du jeu, c'est une grille de cookies. Le jeu se joue comme
Candy Crush Saga etc... c'est un match-3 game... */
export default class Grille {
  tabCookies = [];

  constructor(l, c) {
    this.nbLignes = l;
    this.nbColonnes = c;
    this.cookiesCliquees = [];

    // on passe en paramètre le nombre de cookies différents. 4 = facile, 5 = moyen,
    // 6 = difficile
    this.remplirTableauDeCookies(6); // valeurs possible : 4, 5, 6 par ex
  }

  /**
   * parcours la liste des divs de la grille et affiche les images des cookies
   * correspondant à chaque case. Au passage, à chaque image on va ajouter des
   * écouteurs de click et de drag'n'drop pour pouvoir interagir avec elles
   * et implémenter la logique du jeu.
   */
  showCookies() {
    let caseDivs = document.querySelectorAll("#grille div");

    caseDivs.forEach((div, index) => {
      let ligne = Math.floor(index / this.nbLignes);
      let colonne = index % this.nbColonnes;
      console.log(
        "On remplit le div index=" + index + " l=" + ligne + " col=" + colonne
      );

      // On va mettre un écouteur de click sur l'image de la cookie courante
      let img = this.tabCookies[ligne][colonne].htmlImage;

      img.onclick = (evt) => {
        let imgClickee = evt.target;
        let cookie = this.getCookieFromImage(imgClickee);

        console.log("Cookie cliquée " + cookie.ligne + " " + cookie.colonne);

        // rajout si elle n'a pas déjà été cliquée de la cookie dans
        // le tableau cookieCliquees. On regardera si on peut swapper
        // deux cookies une fois que ce tableau contiendra deux cookies
        if (!this.cookiesCliquees.includes(cookie)) {
          this.cookiesCliquees.push(cookie);
          cookie.selectionnee();
        }
        if (this.cookiesCliquees.length == 2) {
          let cookie1 = this.cookiesCliquees[0];
          let cookie2 = this.cookiesCliquees[1];

          this.essayerDeSwapper(cookie1, cookie2);
        }
      };

      // Avec drag'n'drop, on draggue une image qu'on lâche dans une case. En fait
      // on lache sur une autre image (puisque les images occupent toute la place du div)
      // On mettra donc les écouteurs de "drop" aussi sur les images
      img.ondragstart = (evt) => {
        console.log("drag start");
        let imgClickee = evt.target;
        let cookie = this.getCookieFromImage(imgClickee);

        // on sauve la ligne et la colonne de l'image draggée
        evt.dataTransfer.setData("pos", JSON.stringify(imgClickee.dataset));

        // On ne peuit pas copier la cookie elle-même. Cela ne marche pas car
        // la sérialisation avec JSON.stringify/JSON.parse "perd" les méthodes.
        // Ne sont sérialisées que les propriétés.
        // Ceci ne marche pas : evt.dataTransfer.setData("cookie", JSON.stringify(cookie));
      };

      img.ondragover = (evt) => {
        evt.preventDefault();
      };

      img.ondragenter = (evt) => {
        // pour un effet visuel quand on déplace l'image dragguée...
        evt.target.classList.add("grilleDragOver");
      };

      img.ondragleave = (evt) => {
        // quand on quitte le survol d'une zone de drop on remet
        // le background d'origine
        evt.target.classList.remove("grilleDragOver");
      };

      img.ondrop = (evt) => {
        evt.target.classList.remove("grilleDragOver");

        // on récupère la ligne et la colonne de la cookie draggée
        let position = JSON.parse(evt.dataTransfer.getData("pos"));
        // on récupère la cookie dragguée
        let cookie1 = this.getCookieFromLigneColonne(
          position.ligne,
          position.colonne
        );

        // image sur laquelle on droppe
        let img = evt.target;
        // et la cookie correspondante
        let cookie2 = this.getCookieFromImage(img);

        // on peut essayer de swapper maintenant qu'on a les deux cookies
        this.essayerDeSwapper(cookie1, cookie2);
      };

      // on affiche l'image dans le div pour la faire apparaitre à l'écran.
      div.appendChild(img);
    });
  }

  essayerDeSwapper(cookie1, cookie2) {
    // swap ?
    if (this.swap(cookie1, cookie2)) {
      // ok on a swappé les deux cookies
      cookie2.deselectionnee();
      this.cookiesCliquees = [];

      // Ici il faudra implémenter la détection de chaines de 3 cookie identiques
      // horizontalement et verticalement

      // la cascade, les scores etc.
    } else {
      // on a pas pu swapper
      // on déselectionne la seconde cookies
      cookie2.deselectionnee();

      // ...et on la supprime du tableau cookiesCliquees
      // splice(pos, nbElemsASupprimer)
      this.cookiesCliquees.splice(1, 1);
    }
  }
  getCookieFromImage(img) {
    // On récupère la ligne et la colonne dans l'image,
    // utilisation de l'affectation par décomposition (destructuring assigment),
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/Affecter_par_d%C3%A9composition
    let [l, c] = Cookie.getLigneColonneFromImg(img);
    //console.log("ligne col image = " + l + " " + c);

    //à partir de la ligne et de la colonne on retrouve l'objet cookie associé à l'image
    // cliquée
    return this.getCookieFromLigneColonne(l, c);
  }

  getCookieFromLigneColonne(l, c) {
    return this.tabCookies[l][c];
  }

  swap(cookie1, cookie2) {
    // vérifier si la distance est égale à 1
    if (!Cookie.swapDistancePossible(cookie1, cookie2)) return false;

    // la distance est égale à 1, on swappe
    Cookie.swapCookies(cookie1, cookie2);

    return true;
  }

  /**
   * Initialisation du niveau de départ. Le paramètre est le nombre de cookies différents
   * dans la grille. 4 types (4 couleurs) = facile de trouver des possibilités de faire
   * des groupes de 3. 5 = niveau moyen, 6 = niveau difficile
   *
   * Améliorations : 1) s'assurer que dans la grille générée il n'y a pas déjà de groupes
   * de trois. 2) S'assurer qu'il y a au moins 1 possibilité de faire un groupe de 3 sinon
   * on a perdu d'entrée. 3) réfléchir à des stratégies pour générer des niveaux plus ou moins
   * difficiles.
   *
   * On verra plus tard pour les améliorations...
   */
  remplirTableauDeCookies(nbDeCookiesDifferents) {
    this.tabCookies = create2DArray(this.nbLignes);

    for (let l = 0; l < this.nbLignes; l++) {
      for (let c = 0; c < this.nbColonnes; c++) {
        let type = Math.floor(nbDeCookiesDifferents * Math.random()); // valeur aléatoire entre 0 et nbDeCookiesDifferents
        this.tabCookies[l][c] = new Cookie(type, l, c);
      }
    }
  }
}
