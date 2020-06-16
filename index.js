//Import Express modules
const express = require('express');

//Initialize the express app
const app = new express();

//Use the modules
app.use(express.static('public')); //Uses express in a static web form

app.listen(3000, () => {
	console.log("App listening on port 3000");
});
