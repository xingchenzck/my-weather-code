const request = require('request');
const crcc = require('./city_myweathercode.js');

//（1）通过ip获取当前城市
var url = "http://ip.taobao.com/outGetIpInfo?ip=myip&accessKey=alibaba-inc";
request(url,function(err,data){
    var obj = JSON.parse(data.body);
    var cityName = obj.data.city;
    var cityCodePath = "city_china_weather_code.json";
    //（2）通过城市名获取当前天气
    readCityCode(cityCodePath,cityName,request_citycode);
});