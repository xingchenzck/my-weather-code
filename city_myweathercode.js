//加载fs模块
const fs = require("fs");
const request = require("request");
const { callbackify } = require("util");
//通过名字查询城市天气
readCityCode = function readCityCode(cityCodePath, cityName ,collback){
    fs.readFile(cityCodePath,(err,data)=>{
   var citydata =JSON.parse(data);
   console.log( citydata);
   var citycode = citydata[cityName];
   callback(citycode)
    });
}

//"发送请求至气象台 http://www.weather.com.cn/data/cityinfo/" + cityid + ".html"
request_citycode = function request_citycode(citycode){
   var url = "http://www.weather.com.cn/data/cityinfo/" +citycode+ ".html";
   request(url,(err,data)=>{
   if(err)throw err ;
   console.log(data.body);
    fs.writeFile("./city_current_weather.json",data.body,(err)=>{
        console.log("save cityWeather!");
    })
})
}
module.exports =readCityCode;
module.exports = request_citycode;

// var cityCodePath = "city_chain_weather_code.json";
// var cityName = "上饶"
// readCityCode(cityCodePath,cityName,request_citycode)