const express = require('express');
const app = express();
const httpPort = 80;
const httpsPort = 443;

const https = require('https')
var http = require('http');
const path = require('path')
const fs = require('fs')
app.use(express.static('./portfolio'));
//app.use(express.static('./public/motivation-tracker'));

//app.listen(port, () => console.log(`listening on port ${port}!`));

var privateKey = fs.readFileSync(path.join(__dirname, 'cert', 'private.key.pem'))
var certificate = fs.readFileSync(path.join(__dirname, 'cert', 'domain.cert.pem'))

var credentials = {key: privateKey, cert: certificate}
const httpServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app)

httpsServer.listen(httpsPort, () => console.log(`Secure server on port ${httpsPort}`))
httpServer.listen(httpPort, () => console.log(`insecure server on port ${httpPort}`))

