var sqlite = require('nativescript-sqlite');
var dbName = 'rutaway-drivers.sqlite';
var dbModule = require("./db");
var db = dbModule.openDb(dbName);
var config = require("./config");
var http = require("http");
var util = require("./util");

module.exports = {
  save: function(selectedRoutes, routes, callback) {
    db.then(function(db){
      query = "UPDATE routes SET available = 0"
      db.execSQL(query);
    });
    var routeIds = [];
    for (var i = 0; i < selectedRoutes.length; i++) {
      routeIds.push(selectedRoutes[i].rowid);
    }
    var routeIdsString = routeIds.toString();
    db.then(function(db){
      query = "UPDATE routes SET available = 1 WHERE rowid IN ("+ routeIdsString +")";
      db.execSQL(query).then(callback);
    });
  }
};
