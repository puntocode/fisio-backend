require('dotenv').config();

const express = require('express')
const app = express()

//servir contenido estatico
app.use(express.static('public'));

//public/index.html
app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.get('/template', (req, res) => {
    res.sendFile(__dirname + '/public/template.html');
})

//public/error/404.html
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/error/404.html');
})

const port = process.env.PORT;
app.listen(port)