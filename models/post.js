const Sequelize = require('sequelize')

const sequelize = require('../database')

const Post = sequelize.define("posts", {
	username: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isAlpha: true,
			isLowercase: true
		}
	},
	body: {
		type: Sequelize.TEXT,
		allowNull: false
	}
})

module.exports = Post