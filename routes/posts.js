const express = require('express')

const sqlize = require('sequelize')

const router = express.Router()

const Post = require('../models/post')	

// load all posts
router.get('/', (req, res)=>{
	res.redirect('/')
})

// open the form for creating a new post
router.get('/create', (req, res)=>{
	username = ''
	body = ''
	post = {
		username: username,
		body:body
	}
	res.render('posts/create', {post:post})
})

// create a new post
router.post('/', async (req, res)=>{
	// create a new post with req.body fields
	username = req.body.username
	body = req.body.body
	await Post.create({username:username, body:body}).then(function(){
		res.redirect('/')
	}).catch(sqlize.ValidationError, function (errors){

		console.log(errors)
	})
	
	
})

// show a selected post by ID
router.get('/:id', async (req, res)=>{
	const id = req.params.id
	const post = await Post.findOne({where:{id:id}})
	res.render('posts/show', {post: post})
})

// open the form for editing a selected post
router.get('/edit/:id', async (req, res)=>{
	const id = req.params.id
	const post = await Post.findOne({where:{id:id}})
	// post select by id
	res.render('posts/update', {post: post})
})

// update the post
router.post('/edit/:id', async (req, res)=>{
	// update the post with req.body fields
	let id = req.params.id
	let username = req.body.username
	let body = req.body.body
	await Post.update({ username:username, 
						body: body
	}, {where: {id: id}}).then(function(){
		res.redirect('/')
	}).catch(sqlize.ValidationError, function (errors){
		console.log(errors)
	})

	res.redirect('/')
})

// open the form for deleting a post
router.get('/delete/:id', async (req, res)=>{
	const id = req.params.id
	const post = await Post.findOne({where:{id:id}})
	// post select by id
	res.render('posts/delete', {post: post})
})
// delete the selected post
router.post('/delete/:id', async (req, res)=>{
	// delete the post with req.body fields
	let id = req.params.id
	await Post.destroy({where: {id: id}})
	res.redirect('/')
})

module.exports = router