var sqlite = require('nativescript-sqlite');
var inspect = require('util-inspect');
var dbName = 'rutaway-drivers.sqlite';
var dbModule = require("./db");
var db = dbModule.openDb(dbName);
var bcrypt = require('bcryptjs');

function validCredentials(password, credentials) {
  for(var i = 0; i < credentials.length; i++) {
    if (bcrypt.compareSync(password, credentials[i]['password']))
      return {success: true, type: credentials[i]['admin_type']};
  }
  return {success: false, message: 'Contraseña invalida'};
};

module.exports = {
  Login: function(password, callback) {
    return db.then(function(db){
      db.all("SELECT * FROM admins").then(function(results) {
        db.resultType(2);
        callback(validCredentials(password, results));
      });
    });
  }
};
