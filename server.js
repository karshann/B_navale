// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const bodyParser = require('body-parser');
const app = express();

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/bataille.html");
});
// 
app.get("/insc", (request, response) => {
  response.sendFile(__dirname + "/views/inscreption.html");
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
app.post('/login',(req, res){
   var message = '';
   var sess = req.session; 
 
   if(req.method == "POST"){
      var post  = req.body;
      var email= post.email;
      var pass= post.password;
     
      var sql="SELECT id, email, usernmae, user_name FROM `joueurs` WHERE `email`='"+email+"' and password = '"+pass+"'";                           
      db.query(sql, function(err, results){      
         if(results.length){
            req.session.userId = results[0].id;
            req.session.user = results[0];
            console.log(results[0].id);
            res.redirect('/');
         }
         else{
            message = 'Wrong Credentials.';
            res.render('login.js',{message: message});
         }
                 
      });
   } else {
      res.render('login.js',{message: message});
   }         
};
//la liste des joueurs en ligne

//route for homepage
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
