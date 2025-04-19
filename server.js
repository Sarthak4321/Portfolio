const express = require('express');
const app = express();
app.use(express.static('distribution'));
const PORT = 3000;

const db = require('./db');

app.set("view engine", "ejs");


app.use(express.json());


app.get('/', (req, res) => {
  res.render("index");
})

app.listen(PORT, ()=>{
  console.log("✅Sarthsk's Server has connected succesfully");
  });