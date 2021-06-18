var request = require("request");

// request("https://api.sunrise-sunset.org/json?lat=31.275986&lng=75.293063", function(error, response, body){

// 	if(error){
// 		console.log("something went wrong");
// 		consle.log(error);

// 	}else{
// 		if(response.statusCode == 200){
// 			//things worked!
// 			console.log(body)
// 		}	
// 	}


// })


request("http://www.omdbapi.com/?apikey=eaf698e1&s=avengers", function(error, response, body){

	if(!error && response.statusCode ==200){
		var parseData = JSON.parse(body);
		console.log(parseData);
	}

})