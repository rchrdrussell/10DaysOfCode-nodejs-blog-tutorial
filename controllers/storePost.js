const path = require('path')
const Post = require('../db/models/Post')

module.exports = (req, res) => {
	const{
		image
	} = req.files

	image.mv(path.resolve(__dirname, '..', 'public/posts', image.name), (erro) => {
		Post.create({
			...req.body,
			image: `/posts/${image.name}`
		}, (error, post) => {
			res.redirect('/');
		});
	})
}
