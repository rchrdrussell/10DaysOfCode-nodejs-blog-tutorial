//Import Express modules
const express = require('express');
const expressEdge = require('express-edge');
const path = require('path');
const mongoose = require('mongoose');

//Initialize the express app
const app = new express();

//Connecte to MongoDB database
mongoose.connect('mongodb://localhost:27017/node-blog', { useNewUrlParser: true })
	.then(() => console.log("You are now connected to Mongo!"))
	.catch(err => console.log("Something went wrong!", err));

//Use the modules
app.use(express.static('public')); //Use 'public' directory to store static assets
app.use(expressEdge.engine);
app.set('views', __dirname + '/views'); 

//Route methods
app.get('/', (req, res) => {
	res.render('index');
});

app.get('/posts/new', (req, res) => {
	res.render('create');
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
