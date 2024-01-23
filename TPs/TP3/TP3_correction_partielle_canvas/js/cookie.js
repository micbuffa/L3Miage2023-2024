export default class Cookie {
  static assets;

  constructor(type, ligne, colonne, image) {
    this.type = type;
    this.ligne = ligne;
    this.colonne = colonne;
    this.etat = "chute";

    this.image = image; // pour canvas
    this.width = 75;
    this.height = 75;

    // pour l'état "exploser"
    this.dureeTotaleExplosion = 20; // en "frames" 50 * 1/60ème de seconde = 50 * 16,6 ms
    this.nbFramesEcouleesPendantExplosion = 0;

    this.zoomFactor = 1; // 1 = taille normale, 0.5 = 2 fois plus petit

    this.currentY = 0;
  }

  draw(ctx, x, y) {
    ctx.save();
    // A FAIRE !
    switch (this.etat) {
      case "normal":
        ctx.drawImage(this.image, x, y, this.width, this.height);
        break;
      case "chute":
        ctx.drawImage(this.image, x, this.currentY, this.width, this.height);

        if (this.currentY < y) {
          this.currentY += 10;
        } else {
          this.etat = "normal";
        }
        break;
        case "exploser": {
          // animation d'explosion
          ctx.drawImage(this.image, x + (-5+Math.random()*10), y+(-5+Math.random()*10), this.width, this.height);
          this.nbFramesEcouleesPendantExplosion++;

          if(this.nbFramesEcouleesPendantExplosion > this.dureeTotaleExplosion) {
            // 1 on remet à zéro le compteurs de frames
            this.nbFramesEcouleesPendantExplosion = 0;
            this.etat = "disparaitre";
          }
          break;
        }
        case "disparaitre" :
          ctx.translate(x, y);

          // pour recentrer on va décaler le repère d'une demi largeur et hauteur du rectangle
          // on va le retailler 
          // et on va ensuite appliquer la translatin inverse d'une demi largeur et hauteur
          ctx.translate(this.width/2, this.height/2);
          ctx.scale(this.zoomFactor, this.zoomFactor);
          ctx.translate(-this.width/2, -this.height/2);

          // zoom arrière
          if(!(this.zoomFactor < 0.01)) {
            ctx.drawImage(this.image, 0, 0, this.width, this.height);
            this.zoomFactor -= 0.08;
          } else {
            this.etat = "morte";
            this.zoomFactor = 1;
          }
          break;
    }

    ctx.restore();
  }

  plopSound() {
    if(Cookie.assets.plop.playing()) return;
    
    Cookie.assets.plop.rate(0.5 + Math.random());
    Cookie.assets.plop.play();
  }
  supprimer() {
    this.etat = "exploser";
    this.plopSound();
  }

  dragAndDraw(ctx, x, y) {
    ctx.save();
    ctx.drawImage(this.image, x, y, this.width, this.height);
    ctx.restore();
  }
}
