const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();
const port = 3000;

let scores = [];
const filename = 'scores.json';

//const storage = multer.memoryStorage();
//const upload = multer({ storage });
var multerData = multer();

app.use(express.static("public")); // ICI IMPORTANT !

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/indexGpt.html");
});

app.post('/scores', multerData.fields([]), (req, res) => {
    console.log(req.body);
    let score = { nom: req.body.nom, score: req.body.score };
    scores.push(score);

    console.log(scores)

    fs.writeFileSync(filename, JSON.stringify(scores));
    res.send({ message: 'Score saved successfully' });
});

app.get('/scores', (req, res) => {
    if (!fs.existsSync(filename)) {
        res.send("Scores pas encore générés");
    } else {
        let fileData = fs.readFileSync(filename);
        scores = JSON.parse(fileData);
        res.send(scores);
    }
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
