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

  constructor(type, ligne, colonne) {
    // A FAIRE
    this.type = type;
    this.ligne = ligne;
    this.colonne = colonne;
    this.htmlImage = document.createElement("img");
    this.htmlImage.src = Cookie.urlsImagesNormales[type];
    this.htmlImage.width = 80;
    this.htmlImage.height = 80;
    // utilisation de la "dataset API" de HTML5 pour "attacher"
    // des attributs spécifiques à l'objet HTML créé
    this.htmlImage.dataset.ligne = ligne;
    this.htmlImage.dataset.colonne = colonne;
  }

  selectionnee() {
    // on change l'image et la classe CSS
    this.htmlImage.src = Cookie.urlsImagesSurlignees[this.type];
    // on zoome et on ajoute une ombre
    this.htmlImage.classList.add("cookies-selected");
  }

  deselectionnee() {
    // on change l'image et la classe CSS
    this.htmlImage.src = Cookie.urlsImagesNormales[this.type];
    // on supprime la classe CSS selectionnée
    this.htmlImage.classList.remove("cookies-selected");
  }

  static swapCookies(c1, c2) {
    // avant de swapper, on regarde la distance
    console.log("Distance = " + Cookie.distance(c1, c2));
    if (Cookie.distance(c1, c2) === 1) {
      // On échange leurs images et types
      const imageSrcTmp = c2.htmlImage.src;
      const typeTmp = c2.type;

      c2.htmlImage.src = c1.htmlImage.src;
      c2.type = c1.type;

      c1.htmlImage.src = imageSrcTmp;
      c1.type = typeTmp;
    }
    // et on les désélectionne
    c1.deselectionnee();
    c2.deselectionnee();
  }

  cachee() {
    this.htmlImage.classList.add("cookieCachee");
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
}
