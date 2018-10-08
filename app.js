"use strict";

//####################################### Require:
// express instalieren
let express = require("express");
// parser instalieren: npm i body-parser
let bodyParser = require("body-parser");
//class
let GuestbookEntry = require("./src/GuestbookEntry");
//file
let fs = require("fs");

fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) throw err;
    let d = JSON.parse(data);

    let entries = [];
    for (const entry of d) {
        entries.push(new GuestbookEntry(entry.title, entry.content));
    }



//express anwendung erstellen
let app = express();

//####################################### Module:
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({extended: true}));

//####################################### Einstelung
app.set("view engine", "ejs");
app.set("views", "./views");


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

}); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
