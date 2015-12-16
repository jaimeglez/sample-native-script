var sqlite = require('nativescript-sqlite');
var inspect = require('util-inspect');
var dbName = 'rutaway-drivers.sqlite';
var dbModule = require("./db");
var db = dbModule.openDb(dbName);
var config = require("./config");
var http = require("http");
var util = require("./util");

function saveDb(remote_id, name, remote_location, callback) {
  var remotelocationNumber = util.booleanToNumber(remote_location);
  var query = "INSERT OR REPLACE INTO unit (rowid, remote_id, name, remote_location) VALUES (?, ?, ?, ?);";
  db.then(function(db){
    db.execSQL(query, [1, remote_id, name, remotelocationNumber]).then(function(results) {
      alert('Unidad guardada con exito');;
      callback();
    });
  });
};

function create(unit, callback) {
  var params = {unit_name: unit.name, remote_location: unit.remote_location};
  http.request({
    url: config.apiUrl + "/units",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    content: JSON.stringify(params)
  }).then(function(response) {
    result = response.content.toJSON();
    saveDb(result.id, unit.name, unit.remote_location, callback);
  }, function(error){
    alert(error.data.errors[0].message);
  });
};

function update(unit, callback) {
  var params = {unit_name: unit.name, remote_location: unit.remote_location};
  http.request({
    url: config.apiUrl + '/units/'+ unit.remote_id,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    content: JSON.stringify(params)
  }).then(function(response) {
    result = response.content.toJSON();
    console.log(inspect(result));
    saveDb(result.id, unit.name, unit.remote_location, callback);
  }, function(error){
    alert(error.data.errors[0].message);
  });
};

module.exports = {
  get: function() {
    return db.then(function(db){
      db.resultType(2);
      return db.get("SELECT * FROM unit").then(function(results) {
        return results;
      });
    });
  },
  save: function(unit, callback) {
    var params = {unit_name: unit.name};
    if (unit.remote_id && unit.remote_id != '') {
      console.log('update');
      update(unit, callback);
    } else {
      console.log('create');
      create(unit, callback);
    }
  }

};
