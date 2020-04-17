// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const ejs = require('ejs');
app.set('view engine', 'ejs')
// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/bataille.ejs");
});
// afficher la page d'inscription
app.get("/insc", (request, response) => {
  response.sendFile(__dirname + "/views/inscreption.ejs");
});
// afficher la page d'authentification
app.get("/login", (request, response) => {
  response.sendFile(__dirname + "/views/login.ejs");
});
//


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
var db = require("./public/connexion_db.js");
function getMysqlConnection(){
    var con = mysql.createConnection(dbjson);
    con.connect();
    con.query('use webtest;', function(err,rows,fields) {
        if (err){
            res.end('ERR');
        }
    });
    return con;
}
//route pour ajouet un joueur heroku git:remote -a shielded-woodland-11773
var conn=db.getConnexionDb();
app.post('/save',(req, res) => {
    
  let data = {email: req.body.email, username: req.body.username, fullname: req.body.fullname,password: req.body.password};
  let sql = "INSERT INTO joueurs SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});
//login
app.post('/auth', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        conn.query('SELECT * FROM joueurs WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/joueurs');
            } else {
                response.send('Le nom d\'utilisateur! ou/et le mots de passe incorrect(s)');
            }           
            response.end();
        });
    } else {
        response.send('Veuillez ajouter votre nom d\'utilisateur et votre mots de passe !');
        response.end();
    }
});
//la liste des joueurs en ligne

app.get('/joueurs',(req, res) => {
  let sql = "SELECT * FROM joueurs";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('joueurs',{
      results: results
    });
  });
});
//route pour modifier une jouer
app.post('/update',(req, res) => {
  let sql = "UPDATE joueurs SET fullname='"+req.body.fullname+"', password='"+req.body.password+"' WHERE product_id="+req.body.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});
