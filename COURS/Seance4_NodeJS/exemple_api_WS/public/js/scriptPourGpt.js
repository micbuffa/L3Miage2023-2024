window.onload = init;
const server = "http://localhost:3000";
const apiBaseName = "api";

function init() {
    const b = document.querySelector("#envoi");

    b.onclick = envoyerScore;
}

function envoyerScore() {
    console.log("envoi score");

    const score = {
        nom: "Michel Buffa",
        score: Math.round(Math.random()*1000)
    }

    // on fait un post sur l'url de la route /api/hiscores
    const uri = `${server}/scores`;

    const data = new FormData();
    data.append("nom", score.nom);
    data.append("score", score.score);

    fetch(uri, {
       method:"POST",
       body: data 
    }).then(reponse => {
        console.log(reponse);
    })
}