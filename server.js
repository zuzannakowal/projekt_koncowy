var http = require("http");
var qs = require("querystring");
var fs = require("fs");

var users = []

var tablica = [[0,0,0,0,0,0],
              [0,0,0,0,0,0],
              [0,0,0,0,0,0],
              [0,0,0,0,0,0],
              [0,0,0,0,0,0],
              [0,0,0,0,0,0]]

var zmienna = {player1: "true",player2: "false"}

var server = http.createServer(function (req, res) {
    var request = req;
    var response = res;

    if (request.method == "GET") {
        if (request.url === "/") {
            fs.readFile("static/index.html", function (error, data) {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(data);
                response.end();
            })
        }

        else if (request.url === "/jquery.js") {
            fs.readFile("static/libs/jquery.js", function (error, data) {
                response.writeHead(200, { 'Content-Type': 'aplication/javascript' });
                response.write(data);
                response.end();
            })
        }

        else if (request.url === "/three.js") {
            fs.readFile("static/libs/three.js", function (error, data) {
                response.writeHead(200, { 'Content-Type': 'aplication/javascript' });
                response.write(data);
                response.end();
            })
        }

        else if (request.url === "/css/style.css") {
            fs.readFile("static/css/style.css", function (error, data) {
                response.writeHead(200, { 'Content-Type': 'text/css' });
                response.write(data);
                response.end();
            })
        }

        else if (request.url === "/gra.js"){
          fs.readFile("static/js/gra.js", function (error, data) {
              response.writeHead(200, { 'Content-Type': 'application/javascript' });
              response.write(data);
              response.end();
          })
        }

        else if (request.url === "/net.js"){
          fs.readFile("static/js/net.js", function (error, data) {
              response.writeHead(200, { 'Content-Type': 'application/javascript' });
              response.write(data);
              response.end();
          })
        }

        else if (request.url === "/main.js"){
          fs.readFile("static/js/main.js", function (error, data) {
              response.writeHead(200, { 'Content-Type': 'application/javascript' });
              response.write(data);
              response.end();
          })
        }

        else if (request.url === "/ui.js"){
          fs.readFile("static/js/ui.js", function (error, data) {
              response.writeHead(200, { 'Content-Type': 'application/javascript' });
              response.write(data);
              response.end();
          })
        }        

        else if (request.url === "/tlo.jpeg"){
          fs.readFile("static/gfx/tlo.jpeg", function (error, data) {
              response.writeHead(200, { 'Content-Type': 'image/jpeg' });
              response.write(data);
              response.end();
          })
        }

        else if (request.url === "/pic1.jpeg"){
          fs.readFile("static/gfx/pic1.jpeg", function (error, data) {
              response.writeHead(200, { 'Content-Type': 'image/jpeg' });
              response.write(data);
              response.end();
          })
        }

        else if (request.url === "/pic2.jpeg"){
          fs.readFile("static/gfx/pic2.jpeg", function (error, data) {
              response.writeHead(200, { 'Content-Type': 'image/jpeg' });
              response.write(data);
              response.end();
          })
        }

    }

    if (request.method == "POST") {
      var allData = "";

      req.on("data", function (data) {
          allData += data;
      })

      req.on("end", function (data) {
          var finish = qs.parse(allData)
          switch (finish.action) {
            case "dodaj":
              gracze(finish.nick, request, response)
              break;
            case "usun":
              reset(response)
              break;
            case "check":
              state = "false"
              let ilosc = users.length
              if (ilosc == 2){
                state = "true"
              }
              response.writeHead(200, { "content-type": "text/html;charset=utf-8" })
              response.end(state);
              break;
            case "przesylanie":
              zmiana(finish.ruch, response, finish.data)
              break;
            case "sprawdzanie":
              sprawdzanie(response)
            default:

          }
      })
       
    }
})
function gracze(name, request, response){
  let state
  if (users[0] == null){
    users[0] = name
    state = "player 1"
  } else if (users[1] == null){
    users[1] = name
    state = "player 2"
  } else {
    state = "brak miejsc"
  }
  response.writeHead(200, { "content-type": "text/html;charset=utf-8" })
  response.end(state);

}
function reset(response){
  users = []
  zmienna = {player1: "true",player2: "false"}
  tablica = [[0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]]
  response.writeHead(200, { "content-type": "text/html;charset=utf-8" })
  response.end("jest ok");
}

function zmiana(ruch, response, tab){
  zmienna = {player1: "false",player2: "false"}
  data = ruch
  if(ruch == "player 1"){
    zmienna.player1 = "true"
  }
  else if(ruch == "player 2"){
    zmienna.player2 = "true"
  }
  tablica = JSON.parse(tab)
  response.writeHead(200, { "content-type": "text/html;charset=utf-8" })
  response.end(JSON.stringify(data));
}

function sprawdzanie(response){
    data = {player1: zmienna.player1, player2: zmienna.player2, tablica: tablica}
  response.writeHead(200, { "content-type": "text/html;charset=utf-8" })
  response.end(JSON.stringify(data));

}
server.listen(3000);
