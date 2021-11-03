//routing basically means implementing different actions to a url
//here we use the url module

const http = require('http')
const url = require('url')

const primeServer = http.createServer((request, response) => {
    const path = request.url;
    if(path === '/' || path === '/home'){
        response.end('<h1>this is the homepage of primetech or you can call it the server</h1>')
    }else if(path === '/services'){
        response.end('this is the services page for prime tech website company')
    }else if(path === '/officials'){
        response.end('this is the officials page for the prime tech website company.')
    }else if(path === '/location'){
        response.end('the map that shows the directions to prime tech company will be loaded soon please wait a bit')
    }else{
        response.writeHead(404, {
            'Content-type':'text/html'
        })
        response.end('<h1>the page you requested for was not found</h1>')
    }
    // response.end('hello from the servers of primetech')
})

primeServer.listen(8000, '127.0.0.1')
