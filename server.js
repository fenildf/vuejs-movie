
var PORT = 4100;

/**
 * @type http, HTTP服务器
 *       url,  URL请求解析模块
 *       fs,   FS文件模块
 *       mine,
 *       path; 路径模块
 * @type {exports}
 */
var http = require("http");
var httputils = require("./lib/httputils");
var url = require("url");
var fs = require("fs");
var mine = require("./lib/mine").types;
var path = require("path");

var server = http.createServer(function(request, response){
    var pathname = url.parse(request.url).pathname;
    var realPath = path.join('static',pathname);
    console.log(pathname);
    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    fs.exists(realPath, function(exists){
        if(!exists){
            response.writeHead(404,{
                'Content-Type':'text/plain'
            });

            response.write("This request URL"+pathname+"was not found on this lib.");
            response.end();
        }else{
            fs.readFile(realPath,"binary", function(err, file){
               if(err){
                   response.writeHead(500,{
                       'Content-Type':'text/plain'
                   });
                   response.end();
               }else{
                   var contentType = mine[ext] || "text/plain";
                   response.writeHead(200, {
                       'Content-Type': contentType
                   });
                   response.write(file, "binary");
                   response.end();
               }
            });
        }
    });
});

server.listen(PORT);
console.log("Server running at prot:"+PORT+".");

/**
 * restful api
 * get/post 请求
 */

httputils.get("/liuyidi", function(status, headers, body){
   console.log(body);
});