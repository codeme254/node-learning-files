const fs = require('fs');
const http = require('http');
const url = require('url');

// reading all the files including the JSON data and the html templates to the memory
const tempOverviewCards = fs.readFileSync(`${__dirname}/templates/overview_cards.html`, 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const officialTemp = fs.readFileSync(`${__dirname}/templates/single-official.html`, 'utf-8');

//the json data
const data = fs.readFileSync(`${__dirname}/js/data.json`, 'utf-8')
//converting the json data to an array
const dataArr = JSON.parse(data)

const replaceTemplate = (temp, official) => {
    let output = temp.replace(/{%OFFICIALNAME%}/g, `${official.firstName} ${official.lastName}`);
    output = output.replace(/{%OFFICIALPOSITION%}/g, official.position);
    return output;
}
//creating the server
const primeServer = http.createServer((request, response) => {
    const path = request.url;
    if(path === '/' || path === '/home'){
        response.writeHead(200, {'Content-type':'text/html'});
        const cardsHtml = dataArr.map(element => replaceTemplate(tempOverviewCards, element)).join('');
        const output = tempOverview.replace(/{%OFFICIALSCARDS%}/g, cardsHtml)
        response.end(output);
    }
})

//listening to the server
primeServer.listen(8000, '127.0.0.1');
