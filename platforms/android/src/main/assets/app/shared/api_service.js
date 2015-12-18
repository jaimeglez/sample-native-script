var sqlite = require('nativescript-sqlite');
var inspect = require('util-inspect');
var dbName = 'rutaway-drivers.sqlite';
var dbModule = require("./db");
var db = dbModule.openDb(dbName);
var Unit = require("../../shared/unit")
var config = require("./config");
var http = require("http");
var util = require("./util");

var token = '';
var unitId = '';

function headers() {
  return {
    'Authorization': 'Bearer ' + token,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

exports.login = function(route, callback) {
  Unit.get().then(function(unit){
    if (unit.remote_id){
      unitId = unit.remote_id;
    } else{
      alert('No se puede obtener el ID del dispositivo');
      return callback(error);
    }
    var params = {id: unit.remote_id, route: route.name};
    http.request({
      url: config.apiUrl + "/login",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify(params)
    }).then(function(response) {
      token = response.data.token;
      response['remoteLocation'] = unit.remote_location;
      callback(response);
    }, function(error){
      callback(error);
    });
  });
};

exports.logout = function(callback) {
  Unit.get().then(function(unit){
    if (unit.remote_id){
      unitId = unit.remote_id;
    } else{
      alert('No se puede obtener el ID del dispositivo');
      return callback(error);
    }
    http.request({
      url: config.apiUrl + "/logout/" + unit.remote_id,
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(function(response) {
      token = '';
      response['remoteLocation'] = unit.remote_location;
      callback(response);
    }, function(error){
      callback(error);
    });
  });
};

exports.setPosition = function(latitude, longitude) {
  var params = {latitude: latitude, longitude: longitude};
  http.request({
    url: config.apiUrl + "/locations",
    method: "POST",
    headers: headers(),
    content: JSON.stringify(params)
  }).then(function() {
    console.log('saving...');
  }, function(error){
    console.log(error);
  });
};

