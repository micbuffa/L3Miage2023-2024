export default class Cookie {
  static urlsImagesNormales = [
    "./assets/images/Croissant@2x.png",
    "./assets/images/Cupcake@2x.png",
    "./assets/images/Danish@2x.png",
    "./assets/images/Donut@2x.png",
    "./assets/images/Macaroon@2x.png",
    "./assets/images/SugarCookie@2x.png",
  ];
  static urlsImagesSurlignees = [
    "./assets/images/Croissant-Highlighted@2x.png",
    "./assets/images/Cupcake-Highlighted@2x.png",
    "./assets/images/Danish-Highlighted@2x.png",
    "./assets/images/Donut-Highlighted@2x.png",
    "./assets/images/Macaroon-Highlighted@2x.png",
    "./assets/images/SugarCookie-Highlighted@2x.png",
  ];
  ligne;
  colonne;
  type; // entre 0 et 5 (croissant, cupcake, danish, donut, macaroon, sugarcookie)
  htmlImage;

  constructor(type, ligne, colonne) {
    this.type = type;
    this.ligne = ligne;
    this.colonne = colonne;

    this.htmlImage = document.createElement("img");
    this.htmlImage.src = Cookie.urlsImagesNormales[this.type];
    this.htmlImage.width = 80;
    this.htmlImage.height = 80;
    this.htmlImage.dataset.ligne = ligne;
    this.htmlImage.dataset.colonne = colonne;

    // pour zoom quand on est dessus...
    this.htmlImage.classList.add("cookies");
  }

  selectionnee() {
    // on change l'image
    this.htmlImage.src = Cookie.urlsImagesSurlignees[this.type];
    this.htmlImage.classList.add("cookies-selected");
  }

  deselectionnee() {
    // on change l'image
    this.htmlImage.src = Cookie.urlsImagesNormales[this.type];
    this.htmlImage.classList.remove("cookies-selected");
  }

  static swapCookies(c1, c2) {
    console.log("SWAP C1 C2");
    // On échange leurs images et types
    let typeTmp = c1.type;
    c1.type = c2.type;
    c2.type = typeTmp;

    // et on remet les images normales
    c1.deselectionnee();
    c2.deselectionnee;
  }

  /** renvoie la distance entre deux cookies */
  static distance(cookie1, cookie2) {
    let l1 = cookie1.ligne;
    let c1 = cookie1.colonne;
    let l2 = cookie2.ligne;
    let c2 = cookie2.colonne;

    const distance = Math.sqrt((c2 - c1) * (c2 - c1) + (l2 - l1) * (l2 - l1));
    console.log("Distance = " + distance);
    return distance;
  }

  // renvoie vrai si les cookies 1 et 2 sont contingues (à une case de distance
  // horizontalement et verticalement)
  static swapDistancePossible(c1, c2) {
    let distance = Cookie.distance(c1, c2);
    return distance === 1;
  }

  static getLigneColonneFromImg(img) {
    return [img.dataset.ligne, img.dataset.colonne];
  }
}
