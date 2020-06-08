//import sql3 dependencie
const sqlite3 = require("sqlite3").verbose();

 //create db object that's gonna operate at db
 const db = new sqlite3.Database("./src/database/database.db");

 module.exports = db;
//use the db object to operate
//
// db.serialize(() => {
//     //create table
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places(
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             itens TEXT
//         );
//     `)
//     //insert data
//     const query = `INSERT INTO places(image, name, address, address2, state, city, itens) VALUES (?, ?, ?, ?, ?, ?, ? );`
//     const values = [
//         "https://images.unsplash.com/photo-1481761289552-381112059e05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1161&q=80",
//         "Nome do local novo",
//         "Informações",
//         "endereço",
//         "sc",
//         "Gaspar",
//         "Descrição dos itens do local"
//     ]

//     function afterinsertData(err){
//         if(err){
//             return console.log(err);
//         }
//         console.log("Cadastrado com sucesso!");
//         console.log(this); //Can't use arrow function w/ "this"
//     }

//     db.run(query, values, afterinsertData);

    //get data
    //db.all(`SELECT * FROM places`, function(err, rows){
    //    if(err){
    //        return console.log(err);
    //    }
    //
    //    console.log("Aqui estão os registros");
    //   console.log(rows);
   // });

//     delete data
//     db.run(`DELETE FROM places WHERE id = ? `, [3], function(err){
//        if(err){
//            return console.log(err);
//        }
    
//       console.log("Deletado com sucesso");
//     });

    

// });