var frameModule = require("ui/frame");
var sqlite = require('nativescript-sqlite');

module.exports = {
	openDb: function(dbName) {
    return new sqlite(dbName);
	},
  dropDb: function(dbName) {
    return sqlite.deleteDatabase(dbName);
  }
};
