import Joueur from "./Joueur.js";

let canvas, ctx;
let joueur;

window.onload = init;


function init() {
    // On récupère le canvas
    canvas = document.querySelector("#myCanvas");
    // Pour pouvoir dessiner dans le canvas on a besoin d'un contexte
    ctx = canvas.getContext("2d");

    // On crée les objets du jeu (joueur, emmemis décors etc.)
    joueur = new Joueur();

    // On définit les écouteurs (touches, souris, gamepad, etc.)
    definitEcouteurs();

    // Maintenant je peux demarrer la boucle d'animation
    animationLoop();
}

function definitEcouteurs() { 
    // Ecouteur sur le clavier
    window.addEventListener("keydown", traiteKeyDown);
    window.addEventListener("keyup", traiteKeyUp);
}

function traiteKeyDown(event) {
    const key = event.code;

    if(key == "KeyD") {
        console.log("On va à droite");
        //joueur.move();
        joueur.vx = 5;
    } else if(key == "KeyA") {
        console.log("On va à gauche");
        //joueur.move();
        joueur.vx = -5;
    }
}

function traiteKeyUp(event) {
    const key = event.code;

    if(key == "KeyD" || key == "KeyA") {
        console.log("On arrête le joueur");
        joueur.vx = 0;
    }
}


function animationLoop(time) {
    // 1 - On efface le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2 - On dessine les objets, ennemis, vaisseaux, obstacles etc.
    renderGraphics();

    // 3 - On déplace les objets, ennemis, vaisseaux, obstacles etc.
    update();

    // 4 - On demande au browser de rappeler la boucle d'animation
    // pour générer la prochaine image (frame)
    requestAnimationFrame(animationLoop);
}

let x = 10;
let vitesse = 10;

function renderGraphics() {
    // on dessine le joueur
    joueur.draw(ctx);
}

function renderGraphicsOLD() {
    // Dessiner un rectangle
    ctx.fillStyle = "red";
    // x, y (coordonnées du coin en haut à gauche), largeur, hauteur (en px
    ctx.fillRect(x, 10, 100, 50);

    // On dessine un autre rectangle vert
    ctx.fillStyle = "green";
    ctx.fillRect(150, 10, 100, 50);

    // Un autre bleu en fil de fer
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 5;
    ctx.strokeRect(300, 10, 100, 50);

    // Un cercle jaune avec un contours bleu
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 5;
    // On commence à dessiner
    ctx.beginPath();
    // On dessine un cercle
    // x, y (coordonnées du centre), rayon, angle de départ, 
    // angle de fin
    ctx.arc(100+Math.random()*50, 200, 50, 0, Math.PI * 2);
    
    // On dessine le chemin en cours
    // la forme pleine
    ctx.fill();
    // pour le contours
    ctx.stroke();
}

function update() {
    joueur.move();
    // emmemis.move();
    // score.update();
    // etc.

    detecteCollisions();
}

function detecteCollisions() {
    // joueur avec les ennemis
    // joueur avec les bonus
    // ennemis avec les missiles
    // etc.

    // Detection des collisions
    // Par exemple on va empêcher le joueur d'aller trop loin à droite
    // ou à gauche
    if(joueur.x < 0) {
        // Collision avec le mur de gauche, on met
        // le joueur à la position de contact et
        // on l'arrête
        joueur.x = 0;
        joueur.vx = 0;
    } else if(joueur.x + joueur.l > canvas.width) {
        // collision à droite
        // On remet à la position de contact
        joueur.x = canvas.width - joueur.l;
        joueur.vx = 0;
    }
}