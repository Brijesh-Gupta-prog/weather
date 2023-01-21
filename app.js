const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
    
});
app.post("/",function(req,res){
    const query = req.body.cityName;
    const ApiKey = req.body.ApiKey;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + ApiKey + "&units=metric";
    https.get(url,function(responce){
       console.log(responce.statusCode);



       responce.on("data",function(data){
        //console.log(data);
        const weatherData = JSON.parse(data);
        //console.log(weatherData);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = " http://openweathermap.org/img/wn/" +icon + "@2x.png";
        //console.log(weatherDescription);
        // const object = {
        //     name:"Brijesh",
        //     favouriteFood:"matar-paneer"
        // }
        // console.log(JSON.stringify(object));
        res.write("<h1>The tempreture in the " + query + " is " + temp + " degre Celcious</h1>");
        res.write("<h1>The weather is currently " + weatherDescription + "</h1>" );
        res.write("<img src =" + imageURL + ">");
        res.send();
      });
    });
});
app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000.");
});