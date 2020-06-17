module.exports = (req, res, next) => {
	if(!req.files.image || !req.body.username || !req.body.title || !req.body.content || !req.body.description){
		return res.redirect('/posts/new');
	}

	next()
}
