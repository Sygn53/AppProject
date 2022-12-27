
const fs = require('fs');
let datas = {};
fs.readFile('./databases.json', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  datas = JSON.parse(data);
  //console.log(data.toString());
});

const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write("Welcome my data");
    res.end();
  }

  if (req.url == '/api/data') {
    res.write(JSON.stringify(datas));
    res.end();
  }
});

  server.listen(3000, () => {
    console.log("hi kofte")
  });


