const http = require('http')
const fs = require('fs')
const url = require('url')

/**********************************************************************************
 *     CONST PRIMETECHDATASERVER = HTTP.CREATESERVER((REQUEST, RESPONSE) => {     *
 *                           CONST PATH = REQUEST.URL;                            *
 *                     IF(PATH === '/' || PATH === '/HOME'){                      *
 *   RESPONSE.END('YOU ARE CURRENTLY INSIDE THE HOMEPAGE OF PRIMETECH WEBSITE')   *
 *                           }ELSE IF(PATH === '/API'){                           *
 *          // RESPONSE.END('THE API WILL COME HERE JUST WAIT A MOMENT')          *
 *        FS.READFILE(`${__DIRNAME}/DATA.JSON`, 'UTF-8', (ERR, DATA) => {         *
 *                                    IF(ERR){                                    *
 *                RESPONSE.END('CANNOT LOCATE API AT THIS MOMENT')                *
 *                                     }ELSE{                                     *
 *                    CONST OFFICIALSDATA = JSON.PARSE(DATA);                     *
 *         RESPONSE.WRITEHEAD(200, {'CONTENT-TYPE': 'APPLICATION/JSON'})          *
 *                               RESPONSE.END(DATA)                               *
 *                                       }                                        *
 *                                       })                                       *
 *                                     }ELSE{                                     *
 *             RESPONSE.WRITEHEAD(404, { 'CONTENT-TYPE':'TEXT/HTML'})             *
 * RESPONSE.END('THE REQUESTED PAGE CANNOT BE LOCATED, WE HOPE TO FIX THIS SOON') *
 *                                       }                                        *
 *                                       })                                       *
 *                 PRIMETECHDATASERVER.LISTEN(8000, '127.0.0.1')                  *
 **********************************************************************************/

// a better way of doing all of the above would be to read the file once and just send it when requested instead
// of readig it again and again each time users are requesting for the file

const officialsData = fs.readFileSync(`${__dirname}/data.json`, 'utf-8')
const officialsDataParsed = JSON.parse(officialsData)

const primeTechApiServer = http.createServer((request, response) => {
    const path = request.url;
    if(path === '/' || path === 'home'){
        response.end('you are currently browsing the homepage of primetech website company')
    }else if(path === '/api'){
        response.writeHead(200, {'Content-type':'application/json'})
        response.end(officialsData)
    }else{
        response.end('cannot locate the requested page at the moment')
    }
})
primeTechApiServer.listen(8000, '127.0.0.1', () => console.log('prime tech servers are running'))