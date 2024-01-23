export { loadAssets };

/* Les assets, on pourra plus tard ajouter des sons et des musiques */
const assetsToLoadURLs = {
  croissant: { url: "assets/images/Croissant@2x.png" },
  croissantHighlighted: { url: "assets/images/Croissant-Highlighted@2x.png" },
  cupcake: { url: "assets/images/Cupcake@2x.png" },
  cupcakeHighlighted: { url: "assets/images/Cupcake-Highlighted@2x.png" },
  danish: { url: "assets/images/Danish@2x.png" },
  danishHighlighted: { url: "assets/images/Danish-Highlighted@2x.png" },
  donut: { url: "assets/images/Donut@2x.png" },
  donutHighlighted: { url: "assets/images/Donut-highlighted@2x.png" },
  macaroon: { url: "assets/images/Macaroon@2x.png" },
  macaroonHighlighted: { url: "assets/images/Macaroon-Highlighted@2x.png" },
  sugarCookie: { url: "assets/images/SugarCookie@2x.png" },
  sugarCookieHighlighted: {
    url: "assets/images/SugarCookie-Highlighted@2x.png",
  },
  tileEmpty: { url: "assets/images/TileEmpty.png" },
  plop: {
    url:
      "https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/sounds/plop.mp3",
    buffer: false,
    loop: false,
    volume: 1.0,
  },
  humbug: {
    url:
      "https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/sounds/humbug.mp3",
    buffer: true, // streamée
    loop: true,
    volume: 1.0,
  },
  concertino: {
    url:
      "https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/sounds/christmas_concertino.mp3",
    buffer: true,
    loop: true,
    volume: 1.0,
  },
  xmas: {
    url:
      "https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/sounds/xmas.mp3",
    buffer: true,
    loop: true,
    volume: 0.6,
  },
};

function loadAssets(callback) {
  // here we should load the souds, the sprite sheets etc.
  // then at the end call the callback function
  loadAssetsUsingHowlerAndNoXhr(assetsToLoadURLs, callback);
}

// You do not have to understand in details the next lines of code...
// just use them!

/* ############################
    BUFFER LOADER for loading multiple files asyncrhonously. The callback functions is called when all
    files have been loaded and decoded 
 ############################## */
function isImage(url) {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

function isAudio(url) {
  return url.match(/\.(mp3|ogg|wav)$/) != null;
}

function loadAssetsUsingHowlerAndNoXhr(assetsToBeLoaded, callback) {
  var assetsLoaded = {};
  var loadedAssets = 0;
  var numberOfAssetsToLoad = 0;

  // define ifLoad function
  var ifLoad = function () {
    if (++loadedAssets >= numberOfAssetsToLoad) {
      callback(assetsLoaded);
    }
    console.log("Loaded asset " + loadedAssets);
  };

  // get num of assets to load
  for (var name in assetsToBeLoaded) {
    numberOfAssetsToLoad++;
  }

  console.log("Nb assets to load: " + numberOfAssetsToLoad);

  for (name in assetsToBeLoaded) {
    var url = assetsToBeLoaded[name].url;
    console.log("Loading " + url);
    if (isImage(url)) {
      assetsLoaded[name] = new Image();

      assetsLoaded[name].onload = ifLoad;
      // will start async loading.
      assetsLoaded[name].src = url;
    } else {
      // We assume the asset is an audio file
      console.log(
        "loading " + name + " buffer : " + assetsToBeLoaded[name].loop
      );
      assetsLoaded[name] = new Howl({
        src: [url],
        buffer: assetsToBeLoaded[name].buffer,
        loop: assetsToBeLoaded[name].loop,
        autoplay: false,
        volume: assetsToBeLoaded[name].volume,
        onload: function () {
          if (++loadedAssets >= numberOfAssetsToLoad) {
            callback(assetsLoaded);
          }
          console.log("Loaded asset " + loadedAssets);
        },
      }); // End of howler.js callback
    } // if
  } // for
} // function
