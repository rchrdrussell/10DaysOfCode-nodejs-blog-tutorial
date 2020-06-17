//Import Express modules
const express = require('express');
const expressEdge = require('express-edge');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./db/models/Post');
const fileUpload = require('express-fileupload');

//Initialize the express app
const app = new express();

//Connecte to MongoDB database
mongoose.connect('mongodb://localhost:27017/node-blog', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("You are now connected to Mongo!"))
	.catch(err => console.log("Something went wrong!", err));

//Use the modules
app.use(fileUpload());
app.use(express.static('public')); //Use 'public' directory to store static assets
app.use(expressEdge.engine);
app.set('views', __dirname + '/views'); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

//Route methods
app.get('/', async(req, res) => {
	const posts = await Post.find({})
	res.render('index', {
		posts
	})
});

app.get('/post/:id', async(req, res) => {
	const post = await Post.findById(req.params.id)
	res.render('post', {
		post
	})
});

app.get('/posts/new', (req, res) => {
	res.render('create');
});

app.post('/posts/store', (req, res) => {
	const{
		image
	} = req.files

	image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {
		Post.create({
			...req.body,
			image: `/posts/${image.name}`
		}, (error, post) => {
			res.redirect('/');
		});
	})
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
