var http = require('http');
http.createServer(function (req, res) {
  //res.writeHead(200, {'Content-Type': 'text/plain'});
  //res.end('Hello World\n');
}).listen(8080, '104.131.130.51');
console.log('Server running at http://104.131.130.51:8080/');
app.get('/',function(req,res){
       
     res.sendFile('index.html');

});
