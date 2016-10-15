var express = require("express");
var app = express();

var request = require('request');
var mysql = require("mysql");
var pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "sindhu",
    password: "disha",
    database: "todo_list",
    connectionLimit: 4
});

app.get("/api/list/categories", function (req, res) {
    request('http://www.chabu.in/api/v2/sync_app_data', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.status(200).json(body);
            //console.log(body); // Show the HTML for the Google homepage.
        }else{
            console.log("Error Occurred", error);
            res.status(500).end();
        }
    });
});

app.get("/api/list/business/:catId", function (req, res) {
    request('http://www.chabu.in/api/v2/sync_app_data', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var catId = req.params.catId;
            console.log(typeof(body));
            var result = JSON.parse(body);
            var busi = result.data;
             var business = busi.business;

            var xmlhttp = eval(busi);
            var filteredResult = xmlhttp.filter(function(el) { return el.category_id == catId});
            res.status(200).json(filteredResult);
            //console.log(body); // Show the HTML for the Google homepage.
        }else{
            console.log("Error Occurred", error);
            res.status(500).end();
        }
    });
});


app.use(express.static(__dirname + "/public"));
app.use("/bower_components", express.static(__dirname + "/bower_components"));

app.set("port", process.argv[2] || process.env.APP_PORT || 3001);

app.listen(app.get("port"), function(){
    console.info("Application started on port %d", app.get("port"));
});
