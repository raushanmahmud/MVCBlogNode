// please run `node server` for starting the app

if (process.env.NODE_ENV!=='production'){
	require('dotenv').config();
}


const express = require('express')

const sequelize = require('./database')	

const Post = require('./models/post')	

sequelize.sync()

const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))

const postRouter = require('./routes/posts')
app.use('/posts', postRouter)

app.get('/', async (req, res)=>{
	const posts = await Post.findAll({order:[['createdAt', 'DESC']], raw: true})
	res.render('posts/index', { posts: posts})
})

app.listen(3000)