const express = require('express');
const app = express();
app.use(express.static('distribution'));
const PORT = 3000;
const http = require('http');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// adding bodyparser
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const db = require('./db');
const Massage = require('./model/massage');

app.set("view engine", "ejs");


app.use(express.json());


app.get('/', (req, res) => {
  res.render("index");
})


app.post('/massage', async (req, res) => {
  try {
    const userMassage = req.body;
    const massage = new Massage(userMassage);
    const savedDeta = await massage.save();
    // console.log("massage saved", savedDeta);
    res.status(200).render("massagesend");

  } catch (err) {
    res.status(400).render("massageSendUnsuccesful");
    // console.log("failed", err);
    
  }
})

app.listen(PORT, () => {
  console.log("✅Sarthsk's Server has connected succesfully");
});