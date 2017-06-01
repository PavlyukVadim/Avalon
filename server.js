const express = require('express'); 
const path = require('path'); 
const app = express(); 

app.get('/',function(req,res) { 
	res.sendFile(path.join(__dirname + '/app/index.html')); 
}); 

app.use('/', express.static(__dirname + '/app')); 

const port = process.env.PORT || 5000; 
app.listen(port, function() { 
	console.log("Listening on " + port); 
});