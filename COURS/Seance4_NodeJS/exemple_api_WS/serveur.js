var express = require("express");
var multer = require("multer");
var multerData = multer();

var app = express();

app.use(express.static("public")); // ICI IMPORTANT !

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/hiscores", function (req, res) {
    res.send("Hi Scores :");

});

app.post("/api/hiscores", multerData.fields([]), function (req, res) {
    console.log("Hi Score ajouté !!!!");
    console.log("post sur /api/hiscores, j'ai reçu :");
    console.log(req.body.nom);
    console.log(req.body.val);

    const reponse = {
        msg: "Server a reçu score de " + req.body.nom + " valeur: " + req.body.val,
        code: "OK"
    }
    res.send(JSON.stringify(reponse));
});

var server = app.listen(8085, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Serveur écoute sur http://%s:%s", host, port);
});
