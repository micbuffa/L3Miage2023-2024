export default class Joueur {
    constructor() {
        this.x = 100;
        this.y = 100;
        this.l = 100;
        this.h = 100;
        this.color = "red";
        // vitesse en x
        this.vx = 0;
        this.vy = 0;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        // x, y (coordonnées du coin en haut à gauche), largeur, hauteur (en px
        ctx.fillRect(this.x, this.y, this.l, this.h);
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
    }
}