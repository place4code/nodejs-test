"use strict";

//####################################### Require:
// express instalieren
let express = require("express");
// parser instalieren: npm i body-parser
let bodyParser = require("body-parser");
//class
let GuestbookEntry = require("./src/GuestbookEntry");

//express anwendung erstellen
let app = express();

//####################################### Module:
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({extended: true}));

//####################################### Einstelung
app.set("view engine", "ejs");
app.set("views", "./views");


let entries = [
    new GuestbookEntry("Was ist Lorem Ipsum?", "Lorem Ipsum ist ein einfacher Demo-Text für die Print- und Schriftindustrie. Lorem Ipsum ist in der Industrie bereits der Standard Demo-Text seit 1500, als ein unbekannter Schriftsteller eine Hand voll Wörter nahm und diese durcheinander warf um ein Musterbuch zu erstellen"),
    new GuestbookEntry("Warum nutzen wir es?", "Es ist ein lang erwiesener Fakt, dass ein Leser vom Text abgelenkt wird, wenn er sich ein Layout ansieht."),
]

app.get("/", (req, res) => {
    res.render("index", {
        entries: entries
    });
    res.end();
});

app.post("/guestbook/new", (req, res) => {
    //content und title aus dem Formulare
    let content = req.body.content;
    let title = req.body.title;
    //neuen Eintrag erstellen und hinzufügen:
    let eintrag = new GuestbookEntry(title, content);
    entries.push(eintrag);
    //entries.push(new GuestbookEntry(req.body.title, req.body.content));
    res.redirect("/");
});


app.listen(5000, () => {
    console.log("test wurde gestartet auf localhost 5000");
});




/*
let http = require("http");

let server = http.createServer((request, response) => {
    if (request.url != "/") {
        response.write("url rozny od /");
    }
    response.write("write");
    console.log("wurde ausgeführt!");
    response.end();
});

server.listen(5000);
*/