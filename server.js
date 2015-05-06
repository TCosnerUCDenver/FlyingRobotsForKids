var express = require("express");
var app     = express();
var path    = require("path");
var bodyParser = require('body-parser');
var sys = require("sys");
var execSync = require("exec-sync");
var exec = require('child_process').exec;
var requestify = require("requestify");
var child;
var url = "http://cory-c-test.apigee.net/drone/backflip"
var url2 ="http://cory-c-test.apigee.net/drone/frontflip"
var url3 = "http://cory-c-test.apigee.net/drone/dance"



function get_info_from_git(url, callback) {
	requestify.get(url).then(function(response) {
		response.getBody();
		return callback(response.body);
	});
}

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.post('/visa', function(request, res){
	
    child = exec("node ./node.js_V6/src/send_request.js",function(error, stdout, stderr){
	res.send(stdout);
	var amount = request.body.donationAmount;
	//console.log(amount);
    	console.log(stderr);
	if(amount == "200.00"){
		get_info_from_git(url, function(response) {
			console.log(response);
			//res.send(response);
		});
	}
	if(amount == "300.00"){
            get_info_from_git(url2, function(response) {
                        console.log(response);
                        //res.send(response);
            });
        }
        if(amount == "400.00"){
            get_info_from_git(url3, function(response) {
                        console.log(response);
                        //res.send(response);
            });
        }
    });
});
	


app.use("/public/stylesheets", express.static(__dirname + '/public/stylesheets'));
app.use("/node.js_V6/src", express.static(__dirname + '/node.js_V6/src/visa_auth.js'));

app.listen(3000);
