var express = require("express");
var app = express();

var mysql = require("mysql");
var pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "sindhu",
    password: "disha",
    database: "todo_list",
    connectionLimit: 4
});

app.use(express.static(__dirname + "/public"));
app.use("/bower_components", express.static(__dirname + "/bower_components"));

app.set("port", process.argv[2] || process.env.APP_PORT || 3001);

app.listen(app.get("port"), function(){
    console.info("Application started on port %d", app.get("port"));
});
