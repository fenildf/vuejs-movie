/**
 * 封装HTTP的Get和Post请求
 * @fun 封装express的功能
 */

exports.get = function(url, callback){
    //解析URL,获取所需的信息
    url = require('url').parse(url);
    var hostname = url.hostname,
        port = url.port || 80;
    var path = url.pathname,
        query = url.query;
    if(query) path += "?" + query;

    //实现一个简单的GET请求
    var client = require("http").createClient(port, hostname);
    var request = client.request("GET",path,{
        "Host": hostname
    });
    request.end();

    //该函数用于处理到达的请求
    request.on("response",function(response){
        response.setEncoding("utf8");

        var body = "";

        response.on("data",function(chunk){
           body += chunk;
        });

        response.on("end",function(){
           if(callback){
               callback(response.statusCode,response.headers,body);
           }
        });
    });
};


//HTTP POST请求
exports.post = function(url, data, callback){
    //解析URL,获取所需的信息
    url = require('url').parse(url);
    var hostname = url.hostname,
        port = url.port || 80;
    var path = url.pathname,
        query = url.query;
    if(query) path += "?" + query;

    //判断将要作为请求主体发送的数据类型
    var type;
    if(data == null) data = "";
    if(data instanceof Buffer){     //二进制
        type = "application/octet-stream";
    }else if(typeof data === "string"){    //字符串数据
        type = "text/plain; charset=UTF-8";
    }else if(typeof data === "object"){    // 名/值对
        data = require("querystring").stringify(data);
        type = "application/x-www-form-urlencoded";
    }


    //实现一个简单的POST请求
    var client = require("http").createClient(port, hostname);
    var request = client.request("POST",path,{
        "Host": hostname,
        "Content-Type": type
    });
    request.write(data);     //发送请求主体
    request.end();

    //该函数用于处理到达的请求
    request.on("response",function(response){
        response.setEncoding("utf8");

        var body = "";

        response.on("data",function(chunk){
            body += chunk;
        });

        response.on("end",function(){
            if(callback){
                callback(response.statusCode,response.headers,body);
            }
        });
    });
}