
const express = require('express'); 
const bodyParser = require('body-parser');
const path = require('path')
require("dotenv").config();
const app = express();  
const glob = require("glob");  
const cors = require('cors');          
const port = 5000;    
app.use(bodyParser.urlencoded({ extended:true }));              
app.use(bodyParser.json());
app.use(cors())
app.listen(port, () => {   
    console.log(`Now listening on port ${port}`); 
});


let initRoutes = () => {
	// including all routes
	glob("./src/Routes/*.js", (err, routes) => {
		if (err) {
			console.log("Error occured including routes");
			return;
		} 
		routes.forEach((routePath) => {
			require(routePath).getRouter(app);
		});
		console.log("included " + routes.length + " route files");
	});
	
}

initRoutes()