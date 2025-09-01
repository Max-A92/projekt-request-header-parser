const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/whoami', (req, res) => {
  const ipaddress = req.headers['x-forwarded-for'] || 
                   req.headers['x-real-ip'] || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress ||
                   req.ip;
  
  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];
  
  res.json({
    ipaddress: ipaddress,
    language: language,
    software: software
  });
});

app.listen(port, () => {
  console.log('Server running on port ' + port);
});