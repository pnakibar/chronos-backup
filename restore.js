var http = require("http");
const file = process.argv[2];
const jsons = require(`./${file}`);
const hostname = process.argv[3];
const port = process.argv[4];
const Authorization = process.argv[5];

var options = {
  "method": "POST",
  "hostname": hostname,
  "port": port,
  "path": "/scheduler/iso8601",
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache",
    // 'Authorization': 'Basic aW50ZWdyYXRvcjozbmlZQWNmWUZ1eGwydQ==',
  }
};
if (Authorization) {
  options['headers']['Authorization'] = Authorization
}

jsons.forEach((j) => {
  console.log(`Inserting job: [${j.name}]`)
  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });
  req.write(JSON.stringify(j));
  req.end();
})
