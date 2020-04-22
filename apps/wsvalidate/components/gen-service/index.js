const http = require('http');

function httpRequest(params, postData) {
    return new Promise(function(resolve, reject) {
        var req = http.request(params, function(res) {
            // reject on bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            // cumulate data
            var body = [];
            res.on('data', function(chunk) {
                body.push(chunk);
            });
            // resolve on end
            res.on('end', function() {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch(e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        // reject on request error
        req.on('error', function(err) {
            // This is not a "Second reject", just a different sort of failure
            reject(err);
        });
        if (postData) {
            req.write(postData);
        }
        // IMPORTANT
        req.end();
    });
}

let peerOptions;

if (!process.env['MYNAME']) {
    console.log('The Env Var MYNAME must be set.  Optionally set PEERNAME  to issue an additional request in the handler');
    process.exit(10);
}

let port = 8000;
if (process.env['MYPORT']) {
    port = parseInt(process.env['MYPORT'], 10);
}

let peerport = 8000;
if (process.env['PEERPORT']) {
    peerport = parseInt(process.env['PEERPORT'], 10);
}

let myName = process.env['MYNAME'];

if (process.env['PEERNAME']) {
    const dependency = process.env['PEERNAME'];
    peerOptions = {
        hostname: dependency,
        port: peerport,
        path: '/',
        method: 'GET'
    }
}

console.log(peerOptions);


const requestHandler = async (request, response) => {
    let req;
    if (peerOptions) {
        req = httpRequest(peerOptions);
    } else {
        req = new Promise((resolve, reject) => { resolve(null); });
    }

    req.then((data) => {
        response.setHeader('Content-Type', 'application/json');
        response.writeHead(200);
        response.end(JSON.stringify({ peerResult: data, result: { responder: myName }}));
    }).catch(e => {
        console.error(e);
        process.exit(-1);
    });
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`Service ${myName} listening on ${port}`);

    if (peerOptions) {
        console.log(`I depend on service ${peerOptions.hostname}`);
    }
})

