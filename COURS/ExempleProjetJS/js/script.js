import tableauDonnees from "./data.js";
let dataDuWeb = [];

window.onload = init;

function init() {
    console.log("La page est chargée et les ressources prêtes à l'emploi");

    let premierTitre = document.querySelector("#premierH1");

    premierTitre.style.color = "green";
    premierTitre.style.backgroundColor = "orange";

    // On déclare l'écouteur de l'événement click sur le bouton
    let bouton = document.querySelector("#genereListeButton");
    bouton.addEventListener("click", genereListe);

    // pour le tableau
    document.querySelector("#genereTableauButton").addEventListener("click", genereTableauAPartirDeWebService);
}

let genereListe = () => {
    console.log("Génération de la liste à partir de tableauDonnees");

    for (let i = 0; i < tableauDonnees.length; i++) {
        console.log(tableauDonnees[i].nom);

        // on récupère l'élément ul
        let ul = document.querySelector("#liste");
        // on cree un élément <li></li>
        let li = document.createElement("li");
        li.innerHTML = tableauDonnees[i].nom;

        // on ajoute l'élément li dans l'élément ul comme enfant
        ul.append(li);
    }
}

const genereTableau = () => {
    tableauDonnees.forEach((elem, index, tab) => {
        console.log(elem.nom);

        // on récupère le tbody
        let tbody = document.querySelector("#tableauBody");
        // on cree un élément <tr></tr>
        let tr = document.createElement("tr");
        tr.innerHTML = "<td>" + elem.nom + "</td><td>" + elem.prenom + "</td><td>" + elem.email + "</td>";

        // on ajoute l'élément tr dans l'élément tbody comme enfant
        tbody.append(tr);
    });
}

const genereTableauAvecAPIHTMLDesTables = () => {
    // on récupère la table
    const table = document.querySelector("#table");

    tableauDonnees.forEach(el => {
        // on insère une ligne
        const tr = table.insertRow();
        // on insère les cellules
        const td1 = tr.insertCell();
        const td2 = tr.insertCell();
        const td3 = tr.insertCell();
        // on insère le contenu des cellules
        td1.innerHTML = el.nom;
        td2.innerHTML = el.prenom;
        td3.innerHTML = el.email;
    });
}

const genereTableauAvecDataDuWeb = () => {
    // on récupère la table
    const table = document.querySelector("#table");

    dataDuWeb.forEach(el => {
        // on insère une ligne
        const tr = table.insertRow();
        // on insère les cellules
        const td1 = tr.insertCell();
        const td2 = tr.insertCell();
        const td3 = tr.insertCell();
        // on insère le contenu des cellules
        td1.innerHTML = el.name;
        td2.innerHTML = el.email;
        td3.innerHTML = el.phone;
    });
}
const genereTableauAPartirDeWebService = () => {
    // On recupère des données depuis un des web service
    // d'exemple de https://jsonplaceholder.typicode.com/
    const URI = "https://jsonplaceholder.typicode.com/users";

    // on utilise l'aAPI fetch pour récupérer les données
    fetch(URI)
    .then(reponse => {
        //console.log(reponse);
        // on doit convertir la réponse selon le format reçu
        // la réponse peut être du JSON, du binaire (arrayBuffer ou blob),
        return reponse.json();
    }).then(dataJSON => {
        console.log(dataJSON[0].name);
        // J'ai bien les données, je vais générer le tableau HTML
        dataDuWeb = dataJSON;
        genereTableauAvecDataDuWeb();
    });
    console.log("APRES LE THEN")

}