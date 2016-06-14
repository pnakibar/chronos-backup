var http = require("http");
var fs = require('fs');
const file = `./${process.argv[2]}`;
const hostname = process.argv[3];
const port = process.argv[4];
const Authorization = process.argv[5];

var options = {
  "method": "GET",
  "hostname": hostname,
  "port": port,
  "path": "/scheduler/jobs",
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache",
  }
};

if (Authorization) {
  options['headers']['Authorization'] = Authorization
}

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    fs.writeFileSync(file, body.toString())
    console.log(`Saved to: ${file}`)
  });
});

req.end();
