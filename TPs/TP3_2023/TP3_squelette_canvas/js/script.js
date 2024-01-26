
import Grille from "./grille.js";
import { loadAssets } from "./assets.js";

// 1 On définit une sorte de "programme principal"
// le point d'entrée du code qui sera appelée dès que la
// page ET SES RESSOURCES est chargée

window.onload = init;

let grille;
let canvas, ctx, canvasLargeur, canvasHauteur;

function init() {
  console.log("Page et ressources prêtes à l'emploi");
  // appelée quand la page et ses ressources sont prêtes.
  // On dit aussi que le DOM est ready (en fait un peu plus...)

  loadAssets((assetsLoaded) => {
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");
    canvasLargeur = canvas.width;
    canvasHauteur = canvas.height;

    grille = new Grille(9, 9, canvasLargeur, canvasHauteur, assetsLoaded);
    grille.drawGrille(ctx);
    grille.showCookies(ctx);
  });
}
