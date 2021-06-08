const User = require('../models/user')
module.exports = function (app, opts, done) {



	//get all users
	app.get('/', (request, reply) => {
		User.find({}, (err, docs) => {
			if (!err) {
				reply.send(docs)
			} else {
				reply.send({error: err})
			}
		})
	})

	//get user
	// app.get('/:userId', (request, reply) => {
	// 	let userId = request.params.userId
	// 	User.findById(userId, (err, user) => {
	// 		if (!err) {
	// 			reply.send(user)
	// 		} else {
	// 			reply.send({error: err})
	// 		}
	// 	})
	// })

	//get user async
	app.get('/:userId', async (request, reply) => {
		const userId = request.params.userId
		const user = await User.findById(userId)
		reply.send(user)
	})

	//post user
	app.post('/', (request, reply) => {
		let user = request.body
		User.create(user, (err, user) => {
			if (!err) {
				reply.send(user)
			} else {
				reply.send({error: err})
			}
		})
	})

	//update user
	app.put('/:userId', (request, reply) => {
		let userId = request.params.userId
		let newUserEdit = request.body
		User.findById(userId, (err, user) => {
			if (!err) {
				user.age = newUserEdit.age || user.age
				user.name = newUserEdit.name || user.name
				user.email = newUserEdit.email || user.email
				user.save((er, savedUser) => {
					if (!er) {
						reply.send(savedUser)
					} else {
						reply.send(er)
					}
				})
			} else {
				reply.send({error: err})
			}
		})
	})

	//delete user
	app.delete('/:userId', (request, reply) => {
		let userId = request.params.userId
		User.findById(userId, (err, user) => {
			if (!err) {
				user.remove((er) => {
					if (!er) {
						reply.send('USER DELETED')
					} else {
						reply.send({error: er})
					}
				})
			} else {
				reply.send({error: err})
			}
		})
	})

	done()
}