//Import Express modules
const express = require('express');
const expressEdge = require('express-edge');
const path = require('path');

//Initialize the express app
const app = new express();

//Use the modules
app.use(express.static('public')); //Uses express in a static web form
app.use(expressEdge.engine);
app.set('views', __dirname + '/views');

//Route methods
app.get('/', (req, res) => {
	res.render('index');
});

app.get('/index.html', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'pages/index.html'));
});

app.get('/about.html', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'pages/about.html'));
});

app.get('/contact.html', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
});

app.get('/post.html', (req, res)  => {
	res.sendFile(path.resolve(__dirname, 'pages/post.html'));
});

app.listen(3000, () => {
	console.log("App listening on port 3000");
});
