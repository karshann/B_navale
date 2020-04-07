// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/bataille.html");
});
// 
app.get("/insc", (request, response) => {
  response.sendFile(__dirname + "/views/inscreption.html");
});


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
var conn = require("./connexion_db.js");
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
app.post('/save',(req, res) => {
  let data = {email: req.body.email, username: req.body.username, fullname: req.body.fullname,password: req.body.password};
  let sql = "INSERT INTO joueurs SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
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