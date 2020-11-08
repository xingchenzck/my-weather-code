const http = require('http');
const fs = require('fs');
const url = require('url');
const crcc = require('./city_myweathercode.js');
const cpot = require('./my_positioning.js');
http.createServer(function(req,resp){
    resp.writeHead(200,{"content-type":"text/html;charset=utf-8"});
    var urlobj = url.parse(req.url,true)
    console.log(urlobj);

    if(req.url == "/weather"){
        //先获取当前天气信息
        var cityCodePath = "city_china_weather_code.json";
        var cityName = "上饶";
        readCityCode(cityCodePath,cityName,request_citycode);
        //再跳转页面，底层实现
        fs.readFile("./html/index.html",(err,data) =>{
            if(err) throw err;
            resp.end(data);
        });
    }else if(req.url == "/html/yun.gif"){
        fs.readFile("./html/yun.gif",(err,data) =>{
            if(err) throw err;
            resp.end(data);
        });
    }else if(req.url == "/city_current_weather.json"){
        fs.readFile("./city_current_weather.json",(err,data) =>{
            if(err) throw err;
            resp.end(data);
        });
    }else if(urlobj.pathname == "/weather/select"){
        var cityName = urlobj.query.cityName;
        var cityCodePath = "city_china_weather_code.json";
        //（2）通过城市名获取当前天气
        readCityCode(cityCodePath,cityName,request_citycode);
        setTimeout((err) => {
            resp.end("successful"); 
        }, 200);
    }
    else{
        resp.end("<h1>404!</h1>");
    }
   
}).listen(3000,function () {
    console.log("服务器启动成功！");
})