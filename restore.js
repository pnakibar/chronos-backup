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
  }
};
var optionsDependent = {
  "method": "POST",
  "hostname": hostname,
  "port": port,
  "path": "/scheduler/dependency",
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache",
  }
};


if (Authorization) {
  options['headers']['Authorization'] = Authorization
  optionsDependent['headers']['Authorization'] = Authorization
}

const hasDepedency = (json) => json['parents']
const hasNoDepedency = (json) => !json['parents']
const nonDependentsFirst = jsons.reduce(
  (acc, a) => {
    if (hasDepedency(a)) {
      acc.push(a);
    } else {
      acc.unshift(a);
    }
    return acc;
  },
  []);

nonDependentsFirst.forEach((j) => {
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
