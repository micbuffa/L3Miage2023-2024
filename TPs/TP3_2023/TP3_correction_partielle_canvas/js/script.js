import { loadAssets } from "./assets.js";
import Grille from "./grille.js";

// 1 On définisse une sorte de "programme principal"
// le point d'entrée du code qui sera appelée dès que la
// page ET SES RESSOURCES est chargée

window.onload = init;

let grille;
let canvas, ctx, canvasLargeur, canvasHauteur;
let mousePos = {};
let userState = "rien";
let etatJeu = "menuPrincipal";

let cookieDraggee = null;
let cookieCible = null;

let assets;

function init() {
  console.log("Page et ressources prêtes à l'emploi");
  // appelée quand la page et ses ressources sont prêtes.
  // On dit aussi que le DOM est ready (en fait un peu plus...)

  canvas = document.querySelector("#myCanvas");
  ctx = canvas.getContext("2d");
  canvasLargeur = canvas.width;
  canvasHauteur = canvas.height;

  afficherEcranChargement();

  loadAssets(startGame);

  document.querySelector("#detecteAlignements").onclick = () => {
    grille.detecteTousLesAlignements();
  }
}

function afficherEcranChargement() {
  ctx.font = "50pt Calibri";
  ctx.fillStyle = "yellow"
  ctx.fillText("CHARGEMENT DES ASSETS", 40, 150);

  ctx.strokeStyle = "red";
  ctx.lineWidth = 3;
  ctx.strokeText("CHARGEMENT DES ASSETS", 40, 150);

}

function startGame(assetsLoaded) {
 
  assets = assetsLoaded;

  //assets.xmas.play();

  grille = new Grille(9, 9, canvasLargeur, canvasHauteur, assetsLoaded);

  canvas.onmousedown = traiteMouseDown;
  canvas.onmouseup = traiteMouseUp;
  canvas.onmousemove = traiteMouseMove;

  requestAnimationFrame(animationLoop);
}

function traiteMouseDown(event) {
  //console.log("Souris cliquée bouton = " + event.button);
  //console.log("souris clickée " + mousePos.x + " " + mousePos.y);
  assets.plop.rate(0.5 + Math.random());
  assets.plop.play();
  
  switch(etatJeu) {
    case "menuPrincipal":
      etatJeu = "jeuEnCours";
      break;
  }

  switch (userState) {
    case "cookieEnDrag":
    case "rien":
      // on a cliqué sur une cookie, on va recherche la cookie en fonction
      // du x et du y cliqué
      // puis on va changer l'état pour "cookieEnDrag"
      userState = "cookieEnDrag";

      cookieDraggee = grille.getCookie(mousePos.x, mousePos.y);
  }

 
}

function traiteMouseUp(event) {
  console.log("Souris relâchée bouton = " + event.button);
  console.log("souris relâchée " + mousePos.x + " " + mousePos.y);
  switch (userState) {
    case "cookieEnDrag":
      cookieCible = grille.getCookie(mousePos.x, mousePos.y);
      // regarder si on peut swapper ? ou si on est pas trop loin....
      console.log(
        "on essaie d echanger avec une cookie de type : " + cookieCible.type
      );
      userState = "rien";
      break;
    case "rien":
      break;
  }
}

function getMousePos(event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;

  mousePos = {
    x: x,
    y: y,
  };
}
function traiteMouseMove(event) {
  getMousePos(event);

  //console.log("x souris = " + mousePos.x + " y souris = " + mousePos.y);
}
function animationLoop() {
  // Efface le canvas
  ctx.clearRect(0, 0, canvasLargeur, canvasHauteur);

  switch (etatJeu) {
    case "jeuEnCours":
      updateGame();
      break;
    case "menuPrincipal":
      afficherMenuPrincipal();
  }

  // on demande à redessiner 60 fois par seconde
  requestAnimationFrame(animationLoop);
}

function updateGame() {
  // On dessine les objets
  grille.drawGrille(ctx);
  grille.showCookies(ctx);

  switch (userState) {
    case "cookieEnDrag": {
      cookieDraggee.dragAndDraw(ctx, mousePos.x, mousePos.y);
      break;
    }
  }
}
function afficherMenuPrincipal() {
  ctx.save();

  ctx.font = "50pt Calibri";
  ctx.fillStyle = "yellow"
  ctx.fillText("MENU PRINCIPAL", 140, 150);

  ctx.strokeStyle = "red";
  ctx.lineWidth = 3;
  ctx.strokeText("MENU PRINCIPAL", 140, 150);

  ctx.font = "50pt Calibri";
  ctx.fillStyle = "yellow"
  ctx.fillText("CLIQUEZ POUR DEMARRER", 40, 250);

  ctx.restore();
}
