
import Cookie from "./cookie.js";
import { create2DArray } from "./utils.js";
/* Classe principale du jeu, c'est une grille de cookies. Le jeu se joue comme
Candy Crush Saga etc... c'est un match-3 game... */
export default class Grille {
  tabCookies = [];

  constructor(l, c, canvasLargeur, canvasHauteur, assetsLoaded) {
    this.nbLignes = l;
    this.nbColonnes = c;
    this.canvasLargeur = canvasLargeur;
    this.canvasHauteur = canvasHauteur;
    this.cookiesCliquees = [];
    // largeur et hauteur en pixels
    this.largeurColonnes = canvasLargeur / c;
    this.hauteurLignes = canvasHauteur / l;
    // les images et les sons...
    this.assets = assetsLoaded;
    // on a besoin de faire des sons dans les Cookies. On aurait certainement
    // intérêt à faire une classe assetsManager qui serait importée par
    // la classe Grille et par la classe Cookie...
    Cookie.assets = assetsLoaded;

    // on passe en paramètre le nombre de cookies différents. 4 = facile, 5 = moyen,
    // 6 = difficile
    this.remplirTableauDeCookies(6); // valeurs possible : 4, 5, 6 par ex
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
        switch (type) {
          case 0:
            this.tabCookies[l][c] = new Cookie(type, l, c, this.largeurColonnes, this.hauteurLignes,this.assets.donut)
            break;
          case 1:
            this.tabCookies[l][c] = new Cookie(type, l, c, this.largeurColonnes, this.hauteurLignes,this.assets.croissant)
            break;
          case 2:
            this.tabCookies[l][c] = new Cookie(type, l, c, this.largeurColonnes, this.hauteurLignes,this.assets.cupcake)
            break;
          case 3:
            this.tabCookies[l][c] = new Cookie(type, l, c, this.largeurColonnes, this.hauteurLignes,this.assets.danish)
            break;
          case 4:
            this.tabCookies[l][c] = new Cookie(type, l, c, this.largeurColonnes, this.hauteurLignes,this.assets.macaroon)
            break;
          case 5:
            this.tabCookies[l][c] = new Cookie(type, l, c, this.largeurColonnes, this.hauteurLignes, this.assets.sugarCookie)
            break;
        }
      }
    }
  }

  drawGrille(ctx) {
    ctx.save();

    ctx.lineWidth = 20;
    ctx.strokeStyle = "lightgrey";
    let y = 0;

    ctx.beginPath();

    // todo : dessiner une grille
    for (let l = 0; l < this.nbLignes; l++) {
      ctx.moveTo(0, y);
      ctx.lineTo(this.canvasLargeur, y);
      y += this.hauteurLignes;
    }

    let x = 0;
    for (let c = 0; c < this.nbColonnes; c++) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.canvasHauteur);
      x += this.largeurColonnes;
    }
    // déclenche le dessin
    ctx.stroke();
    /*
        ctx.strokeStyle="red";
        ctx.lineWidth = 5;
        ctx.stroke();
    */
    ctx.restore();
  }
  /**
   * parcours la liste des cases de la grille et affiche les images des cookies
   * correspondant à chaque case. Au passage, à chaque image on va ajouter des
   * écouteurs de click et de drag'n'drop pour pouvoir interagir avec elles
   * et implémenter la logique du jeu.
   */
  showCookies(ctx) {
    // TODO dessiner les cookies dans la grille
    ctx.save();
    for (let l = 0; l < this.nbLignes; l++) {
      for (let c = 0; c < this.nbColonnes; c++) {
        this.tabCookies[l][c].draw(ctx);
      }
    }
    ctx.restore();
  }
}
