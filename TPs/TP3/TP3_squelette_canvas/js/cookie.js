export default class Cookie {
  // pour pouvoir jouer des sons...
  static assets;

  constructor(type, ligne, colonne, image) {
    this.type = type;
    this.ligne = ligne;
    this.colonne = colonne;

    this.htmlImage = image; // pour canvas
    this.htmlImage.width = 80;
    this.htmlImage.height = 80;
    this.htmlImage.dataset.ligne = ligne;
    this.htmlImage.dataset.colonne = colonne;
  }

  draw(ctx, x, y, l, h) {
    ctx.save();
    // A FAIRE !
    ctx.restore();
  }
}
