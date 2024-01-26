var http = require('http');
//Création du serveur 
var server = http.createServer((req, res) => { 
    res.writeHead(200, {"Content-Type": "text/plain"}); 
    res.end('Hello World '); 
});
//Démarrage du serveur sur le port 8085
server.listen(8085);