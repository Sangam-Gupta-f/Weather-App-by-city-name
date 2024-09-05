
const https = require('https');
const nodemailer = require('nodemailer');
const express=require("express");
const bodyParser = require('body-parser');
const app=express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    
    res.sendFile(__dirname + "/index.html");      
});

//   app.post("/",function(req,res){
//     const name=req.body.YName;
//     const email=req.body.Yemail;
//     const msg=req.body.Ymsg;
//    res.send(console.log(name,email,msg)); 
// });  
app.post("/",function(req,res){
   //res.send(console.log() )
   const url="https://api.openweathermap.org/data/2.5/weather?q="+req.body.cityname+"&appid=4fd1cb49ca6ed7f001fca31a7ca2ea7a&units=metric";
   https.get(url,(response)=>{
    console.log(response.statusCode);
    response.on("data",function(data){
            const mydata=JSON.parse(data);
            //console.log(mydata);
            console.log(mydata.main.temp);
            const icon=mydata.weather[0].icon;
            const imgurl="https://openweathermap.org/img/wn/"+icon+"@2x.png"
            
           // res.write("<p>Hello good morning<p>");
    
            res.write("<h1>"+ req.body.cityname + " temperature is  "+ mydata.main.temp+ " degree celcius</h1>");
            res.write("<img src="+imgurl+">");
            res.send();
    })

})
})



app.listen(3000,(req,res)=>{
    console.log("app is runing on 3000");
})


// const http = require("http");
// const nodemailer = require("nodemailer");

// const server = http.createServer((request, response) => {
//     const auth = nodemailer.createTransport({
//         service: "gmail",
//         secure : true,
//         port : 465,
//         auth: {
//             user: "youremail@gmail.com",
//             pass: "your_password"

//         }
//     });

//     const receiver = {
//         from : "youremail@gmail.com",
//         to : "youremail@gmail.com",
//         subject : "Node Js Mail Testing!",
//         text : "Hello this is a text mail!"
//     };

//     auth.sendMail(receiver, (error, emailResponse) => {
//         if(error)
//         throw error;
//         console.log("success!");
//         response.end();
//     });
    
// });

// server.listen(8080);