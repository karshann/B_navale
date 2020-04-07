
 /*var conn = mysql.createConnection({
  database: 'heroku_d613e59ba1c09d9',
  host: "us-cdbr-iron-east-01.cleardb.net",
  user: "b7794cbf5ee64d",
  password: "ea46f1b8"

});*/

 
module.exports={

getConnexionDb:function(){

 	console.log('Get connection ...');
 	var mysql = require('mysql');
 var db_config = {
  host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b7794cbf5ee64d',
    password: 'ea46f1b8',
    database: 'heroku_d613e59ba1c09d9'
};

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } else{
    	

    }                                    // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();
return connection;
}};
/*
mysql --host=us-cdbr-iron-east-01.cleardb.net --user=b7794cbf5ee64d --password=ea46f1b8 --reconnect heroku_d613e59ba1c09d9

CREATE TABLE IF NOT EXISTS `joueurs` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  email varchar(255) NOT NULL,
  username varchar(255) NOT NULL,
  fullname varchar(255) NOT NULL,
  password password char(40) character set ascii NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;*/
 