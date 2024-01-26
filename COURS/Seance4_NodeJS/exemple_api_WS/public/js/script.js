window.onload = init;
const server = "http://localhost:8085";
const apiBaseName = "api";

function init() {
    const b = document.querySelector("#envoi");

    b.onclick = envoyerScore;
}

function envoyerScore() {
    console.log("envoi score");

    const score = {
        nom: "Michel Buffa",
        val: Math.round(Math.random()*1000)
    }

    // on fait un post sur l'url de la route /api/hiscores
    const uri = `${server}/${apiBaseName}/hiscores`;

    const data = new FormData();
    data.append("nom", score.nom);
    data.append("val", score.val);

    fetch(uri, {
       method:"POST",
       body: data 
    }).then(reponse => {
        console.log(reponse);
    })
}