const http = require("http");

http.createServer((req,res)=>{
    res.writeHead(200,"Divyendu Success",{'Content-Type': 'text/plain'});
    res.end("Hello world");
}).listen(8001);
