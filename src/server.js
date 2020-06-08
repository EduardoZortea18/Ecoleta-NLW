const express = require('express'); // chama o express
const server = express(); // coloca o express na variavel do servidor

const db = require("./database/db.js");

//Configure public folder
server.use(express.static("public"));

//Habilitar o uso do body
server.use(express.urlencoded({extended: true}));

//Using Template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true //Not using cache
});

//Configure the application paths
//home page
//req = reqeust // res = response
server.get("/", (req, res) => {
    return res.render("index.html", {title: "Titulo"})
});

server.get("/create-point", (req, res) => {

    return res.render("create-point.html")
});

server.post("/savepoint", (req,res) => {

    //insert data at db
    const query = `INSERT INTO places(image, name, address, address2, state, city, itens) VALUES (?, ?, ?, ?, ?, ?, ? );`
    const values = [
       req.body.image,
       req.body.name,
       req.body.address,
       req.body.address2,
       req.body.state,
       req.body.city,
       req.body.itens,
    ]

    function afterinsertData(err){
        if(err){
            console.log(err);
            return res.send("Erro no cadastro!");
        }
        console.log("Cadastrado com sucesso!");
        console.log(this); //Can't use arrow function w/ "this"

        return res.render("create-point.html", {saved: true});
    }

    db.run(query, values, afterinsertData);
   
})

server.get("/search-results", (req, res) => {

    const search = req.query.search;

    if (search == "") {
        return res.render("search-results.html", { total: 0})
    }

    //get data from db
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err);
        }

        const total = rows.length;

        return res.render("search-results.html", { places: rows, total: total})
       });
});


//Turn on the server
server.listen(3000);