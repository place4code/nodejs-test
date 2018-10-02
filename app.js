"use strict";

let express = require("express");
let GuestbookEntry = require("./src/GuestbookEntry");

let app = express();

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("./public"));

let entries = [
    new GuestbookEntry("Überschrift", "Inhalt"),
]

app.get("/", (req, res) => {

    res.render("index", {
        entries: entries
    });
    res.end();
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