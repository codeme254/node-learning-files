const http = require('http');

const server = http.createServer((request, response) => {
    const path = request.url;
    if(path == '/'){
        response.writeHead(200, {'Content-type':'text/html'})
        response.end("<h1>You are browsing the hompage of our website...</h1>");
    }else if(path == '/about'){
        response.writeHead(200, {'Content-type':'text/html'})
        response.end('<h1>you are browsing the about page of our website...</h1>');
    }else if(path == '/officials'){
        response.writeHead(200, {'Content-type':'text/html'})
        response.end('<h1>you are browsing the officials page of our website...👦</h1>');
    }else if(path == '/projects'){
        response.writeHead(200, {'Content-type':'text/htm;'})
        response.end('<h1>you are browsing the projects page of our website...</h1>')
    }else{
        response.writeHead(404, {'Content-type':'text/html'});
        response.end('<h1>The content you requested for could not be located...</h1>')
    }
})
server.listen(3000, '127.0.0.1')