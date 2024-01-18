import Cookie from "./cookie.js";
import { create2DArray } from "./utils.js";

/* Classe principale du jeu, c'est une grille de cookies. Le jeu se joue comme
Candy Crush Saga etc... c'est un match-3 game... */
export default class Grille {
  cookiesSelectionnees = [];

  constructor(l, c) {
    this.colonnes = c;
    this.lignes = l;
    // le tableau des cookies
    this.cookies = create2DArray(l);

    //let existeAlignement = false;
    this.remplirTableauDeCookies(6);
    /*
    do {
      this.remplirTableauDeCookies(6);
      existeAlignement = this.testAlignementDansTouteLaGrille();
      console.log("ExisteAlignement : " + existeAlignement)
    } while(existeAlignement)
    */
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
      let ligne = Math.floor(index / this.lignes);
      let colonne = index % this.colonnes;

      let cookie = this.cookies[ligne][colonne];
      let img = cookie.htmlImage;

      // On met un écouteur de click sur l'image
      img.onclick = (event) => {
        let cookieClickee = this.getCookieFromImage(event.target);

        // on regarde combien on a de cookies selectionnées
        if (this.cookiesSelectionnees.length === 0) {
          cookieClickee.selectionnee();
          this.cookiesSelectionnees.push(cookieClickee);
        } else if (this.cookiesSelectionnees.length === 1) {
          cookieClickee.selectionnee();
          console.log("On essaie de swapper !")
          this.cookiesSelectionnees.push(cookieClickee);
          // on essaie de swapper
          Cookie.swapCookies(this.cookiesSelectionnees[0],
            this.cookiesSelectionnees[1]);
          // on remet le tableau des cookies selectionnées à 0
          this.cookiesSelectionnees = [];
        } else {
          console.log("Deux cookies sont déjà sélectionnées...")
        }
      }

      // On met un écouteur de drag'n'drop sur l'image
      img.ondragstart = (event) => {
        let cookieDragguee = this.getCookieFromImage(event.target);
        cookieDragguee.selectionnee();

        // on remet à zero le tableau des cookies selectionnees
        this.cookiesSelectionnees = [];
        this.cookiesSelectionnees.push(cookieDragguee);
      }

      img.ondragover = (event) => {
        return false;
      }

      img.ondragenter = (event) => {
        const i = event.target;
        i.classList.add("imgDragOver");
      }

      img.ondragleave = (event) => {
        const i = event.target;
        i.classList.remove("imgDragOver");
      }

      img.ondrop = (event) => {
        let cookieDragguee = this.getCookieFromImage(event.target);
        cookieDragguee.selectionnee();

        // on ajoute au tableau la deuxième cookie
        this.cookiesSelectionnees.push(cookieDragguee);

        // et on regarde si on peut les swapper
        Cookie.swapCookies(this.cookiesSelectionnees[0], this.cookiesSelectionnees[1]);

        // on remet le tableau des cookies selectionnées à 0
        this.cookiesSelectionnees = [];
        cookieDragguee.htmlImage.classList.remove("imgDragOver");
      }

      div.appendChild(img);
    });
  }

  getCookieFromImage(i) {
    let ligneCookie = i.dataset.ligne;
    let colonneCookie = i.dataset.colonne;
    return this.cookies[ligneCookie][colonneCookie];
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
    for (let l = 0; l < this.lignes; l++) {
      for (let c = 0; c < this.colonnes; c++) {
        //console.log("ligne = " + l + " colonne = " + c);
        const type = Math.round(Math.random() * (nbDeCookiesDifferents - 1))
        this.cookies[l][c] = new Cookie(type, l, c);
      }
    }
  }


  // Test des alignements de 3 cookies ou plus, horizontalement et verticalement

  testAlignementDansTouteLaGrille() {
    let alignementExisteLignes = false;
    let alignementExisteColonnes = false;

    alignementExisteLignes = this.testAlignementToutesLesLignes();
    alignementExisteColonnes = this.testAlignementToutesLesColonnes();

    return (alignementExisteLignes || alignementExisteColonnes);
  }

  testAlignementToutesLesLignes() {
    let alignementLignes = false;

    for (let i = 0; i < this.lignes; i++) {
      alignementLignes = this.testAlignementLigne(i);
    }

    return alignementLignes;
  }

  testAlignementLigne(ligne) {
    let alignement = false;

    // on récupère le tableau qui correspond à la ligne
    let tabLigne = this.cookies[ligne];

    //on parcours les colonnes de la ligne courante
    for (let c = 0; c <= this.lignes - 3; c++) {
      let cookie1 = tabLigne[c];
      let cookie2 = tabLigne[c + 1];
      let cookie3 = tabLigne[c + 2];

      if ((cookie1.type === cookie2.type) && (cookie2.type === cookie3.type)) {
        cookie1.cachee();
        cookie2.cachee();
        cookie3.cachee();
        alignement = true;
      }
    }
    return alignement;
  }
  testAlignementToutesLesColonnes() {
    let alignementColonnes = false;
    for (let i = 0; i < this.colonnes; i++) {
      alignementColonnes = this.testAlignementColonne(i);
    }

    return alignementColonnes;
  }

  testAlignementColonne(colonne) {
    let alignement = false;

    // on parcourt les lignes de la colonne courante
    for (let l = 0; l <= this.colonnes - 3; l++) {
      let cookie1 = this.cookies[l][colonne];
      let cookie2 = this.cookies[l+1][colonne];
      let cookie3 = this.cookies[l+2][colonne];

      if ((cookie1.type === cookie2.type) && (cookie2.type === cookie3.type)) {
        cookie1.cachee();
        cookie2.cachee();
        cookie3.cachee();
        alignement = true;
      }
    }
    return alignement;
  }
}
