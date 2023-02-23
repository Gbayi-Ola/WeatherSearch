const express = require("express");
const https = require("https");
const bodyParse = require("body-parser");


const app = express();
app.use(bodyParse.urlencoded({extended:true}));


app.get("/", function(req,res){
    
    res.sendFile(__dirname + "/index.html")
    
})

    app.post("/", function(req,res){
        
    const apiKey = "0afb3d9cb01a414a4c6bc4f623a179c7";
    const country = req.body.cityName;
    const unit = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${country}&units=${unit}`;


    https.get(url,function(response){
        // console.log(response.statusCode );
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const weatherDescrip = weatherData.weather[0].description;
            const count = weatherData.sys.country;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            // console.log(weatherData.weather[0].description);
            res.send(`
            <center style="margin-top:30px">
                
            <h3>Your search country: <b style= "color:green;">${count}</b> </h3> 
            <p><b>The weather description and temperature for ${country}: ${weatherDescrip} @ ${temp} degrees Celcius</b></p>
            <img src= "${imageUrl}">

            </center>
            
            `)
        }) 
    })

    })





app.listen(3000,function(){
    console.log("server running on port 3000");
});