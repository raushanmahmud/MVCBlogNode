const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: process.env.DB_DIALECT
})

sequelize.authenticate()
.then( function(err){
	console.log('Connection has been established successfully')
})
.catch(function(err){
	console.log(err)
})

module.exports = sequelize
