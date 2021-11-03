// const fs = require('fs');
// const http = require('http');
// const url = require('url');

// // reading all the files including the JSON data and the html templates to the memory
// const tempOverviewCards = fs.readFileSync(`${__dirname}/templates/overview_cards.html`, 'utf-8');
// const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
// const officialTemp = fs.readFileSync(`${__dirname}/templates/single-official.html`, 'utf-8');

// //the json data
// const data = fs.readFileSync(`${__dirname}/js/data.json`, 'utf-8')
// //converting the json data to an array
// const dataArr = JSON.parse(data)

// const replaceTemplate = (temp, official) => {
//     let output = temp.replace(/{%OFFICIALNAME%}/g, `${official.firstName} ${official.lastName}`);
//     output = output.replace(/{%OFFICIALPOSITION%}/g, official.position);
//     return output;
// }
// //creating the server
// const primeServer = http.createServer((request, response) => {
//     const path = request.url;
//     if(path === '/' || path === '/home'){
//         response.writeHead(200, {'Content-type':'text/html'});
//         const cardsHtml = dataArr.map(element => replaceTemplate(tempOverviewCards, element)).join('');
//         const output = tempOverview.replace(/{%OFFICIALSCARDS%}/g, cardsHtml)
//         response.end(output);
//     }
// })

// //listening to the server
// primeServer.listen(8000, '127.0.0.1');

// a recap of all this

//making the important imports
const fs = require('fs');
const http = require('http');
const { off } = require('process');
const url = require('url');

// reading the files synchronously
const tempCard = fs.readFileSync(`${__dirname}/templates/overview_cards.html`, 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tempSingleOfficial = fs.readFileSync(`${__dirname}/templates/single-official.html`, 'utf-8');

// reading the data

const replaceTemplate = (template, official) => {
    let output = template.replace(/{%OFFICIALNAME%}/g, `${official.firstName} ${official.lastName}`);
    output = output.replace(/{%OFFICIALPOSITION%}/g, official.position);
    output = output.replace(/{%ID%}/g, official.id);
    output = output.replace(/{%OFFICIAL_IMAGE%}/g, official.image);
    return output;
}
const data = fs.readFileSync(`${__dirname}/js/data.json`, 'utf-8');
const dataArr = JSON.parse(data);

const primeServer = http.createServer((request, response) => {
    // console.log(request.url)
    // console.log(url.parse(request.url, true))
    const { query, pathname } = url.parse(request.url, true)
    if(pathname === '/' || pathname === '/home' || pathname === '/overview'){
        response.writeHead(200, {'Content-type':'text/html'});
        const officialsCards = dataArr.map(element => replaceTemplate(tempCard, element)).join('');
        const output = tempOverview.replace(/{%OFFICIALSCARDS%}/g, officialsCards)
        response.end(output)
    }
    else if(pathname === '/official'){
        response.writeHead(200, {'Content-type':'text/html'});
        const officialToDisplay = dataArr[query.id];
        let out = tempSingleOfficial.replace(/{%OFFICIALNAME%}/g, `${officialToDisplay.firstName} ${officialToDisplay.lastName}`)
        out = out.replace(/{%OFFICIALAGE%}/g, officialToDisplay.age);
        out = out.replace(/{%OFFICIAL_POSITION%}/g, officialToDisplay.position);
        out = out.replace(/{%OFFICIAL_IMAGE%}/g, officialToDisplay.image);
        out = out.replace(/{%P_I%}/g, officialToDisplay.initials)
        out = out.replace(/{%OFFICIAL_P_LANGUAGES%}/g, officialToDisplay.technologies)
        out = out.replace(/{%OFFICIAL_DESCRIPTION%}/g, officialToDisplay.about)
        response.end(out)
    }
    else{
        response.writeHead(404, {'Content-type':'text/html'})
        response.end('<h1>cannot locate the requested page at the moment</h1>')
    }
})

primeServer.listen(8000, '127.0.0.1');