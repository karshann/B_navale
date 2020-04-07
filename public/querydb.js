var db = require("./connexion_db.js");// importer le fichier de la conexion à la base de donnée
var conn=db.getConnexionDb();// appel à la fonction pour se connceter
//les valeurs d'un record pour insertion
var emails = "email@email.com";
var usernames = "users1";
var fullNames = "mynameis";
var password = "abababab";

// Inserer un joueur
var sqli = "Insert into joueurs (id, email, username,fullname,password) " //
    +
    " Values ('" + "', '"+ emails + "', '" + usernames +"', '" +  fullNames +"', '" +password+"' );" ;

conn.query(sqli, function(err, results) {
    if (err) throw err;
    console.log("insertion reussit!!!");
    res.redirect('/');
});
