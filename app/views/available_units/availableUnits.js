var vmModule = require("./availableUnits-view-model");
var navigation = require("../../shared/navigation");
var observableModule = require("data/observable");
var observableArrayModule = require("data/observable-array");
var inspect = require('util-inspect');
var globals = require("globals");

var sqlite = require('nativescript-sqlite');
var dbName = 'rutaway-drivers.sqlite';
var dbModule = require("../../shared/db");
var db = dbModule.openDb(dbName);
var page;
var pageData = new observableModule.Observable({
    unitList: new observableArrayModule.ObservableArray([])
});

function setUpDB(db){
  db.execSQL("CREATE TABLE IF NOT EXISTS unit (remote_id TEXT, name TEXT, remote_location BOOLEAN NOT NULL CHECK (remote_location IN (0,1)) DEFAULT 0)");
  db.execSQL("CREATE TABLE IF NOT EXISTS admins (password TEXT, admin_type TEXT)")
    .then(function() {
      db.all("SELECT * FROM admins").then(function(results) {
        if (results.length > 0) return;
        db.execSQL("INSERT INTO admins (password, admin_type) VALUES (?, ?)", ['$2a$10$eHW4V4lPEHx7XP03v.Y7b.AAQ7e7E.f1xxjklBGAPRHixJrUHLwze', 'admin']);
        db.execSQL("INSERT INTO admins (password, admin_type) VALUES (?, ?)", ['$2a$10$ttnJSL/cpJaSRvdgLdX3M.ZNi3Dh6Bso/4mF7H2Q58NB23x00hhui', 'superAdmin']);
      });
    });
  db.execSQL("CREATE TABLE IF NOT EXISTS routes (name TEXT, remote_id TEXT, available BOOLEAN NOT NULL CHECK (available IN (0,1)) DEFAULT 0)")
    .then(function(){
      db.all("SELECT * FROM routes").then(function(results) {
        if (results.length > 0) return;
        db.execSQL("INSERT INTO routes (name, remote_id) VALUES (?, ?)", ['622', 'a493a1cc-9568-11e5-8984-feff819cdc9f']);
        db.execSQL("INSERT INTO routes (name, remote_id) VALUES (?, ?)", ['622 TERRANOVA', 'a493c1cc-9569-11e5-8984-feff819cdc9f']);
        db.execSQL("INSERT INTO routes (name, remote_id) VALUES (?, ?)", ['640', 'a493c1cc-9569-11e5-8984-feff819cdc9e']);
        getAvailableRoutes(db);
      });
    });
};

function getAvailableRoutes(db){
  db.resultType(2);
  db.all("SELECT * FROM routes WHERE available = 1").then(function(results) {
    pageData.set('unitList', results);
  });
};

exports.pageLoaded = function(args) {
  page = args.object;
  page.bindingContext = pageData;
  // dbModule.dropDb(dbName);
  db.then(function(db){
    setUpDB(db);
    if (sqlite.exists(dbName)) getAvailableRoutes(db);
  });
};

exports.goToLogin = function(args){
  if(args.direction == 2) //Right to Left
    navigation.goToLoginPage();
};

exports.goToUnit = function(args){
  var unit = args.view.bindingContext;
  navigation.goToUnitPage(unit);

};

