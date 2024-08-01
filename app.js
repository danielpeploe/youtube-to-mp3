// packages
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

// create express server
const app = express();

const PORT = process.env.PORT || 3000;

// set template engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({ 
    extended: true 
}));
app.use(express.json());

// routes
app.get("/", (req, res) => {
    res.render('index');
});

app.post("/", (req, res) => {
    res.send('Hello World');
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})