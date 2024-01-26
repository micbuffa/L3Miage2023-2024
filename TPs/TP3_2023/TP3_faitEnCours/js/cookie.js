export default class Cookie {
  // pour pouvoir jouer des sons...
  static assets;

  constructor(type, ligne, colonne, largeurCase, hauteurCase, image) {
    this.type = type;
    this.ligne = ligne;
    this.colonne = colonne;

    this.image = image; // pour canvas
    this.width = largeurCase;
    this.height =  hauteurCase;

    this.yDepart = 0;

    this.x = this.ligne * this.height;
    this.y = this.colonne * this.width;

    console.log("largeur = " + hauteurCase);
  }

  draw(ctx) {
    ctx.save();
    // A FAIRE !
    ctx.drawImage(this.image, this.x, this.yDepart, this.width, this.height);
    if(this.yDepart < this.y) {
      this.yDepart+=10;
    } else {
      this.yDepart = this.y;
    }
    ctx.restore();
  }
}
