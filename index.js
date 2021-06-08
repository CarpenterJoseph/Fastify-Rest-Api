//code based on https://blog.bitsrc.io/how-to-build-rest-apis-with-fastify-2eac64536a72

const fastify = require('fastify')
const db = require('./db')

const app = fastify()

const mongoURL = process.env.MONGODB_URL || 'mongodb://localhost:27017/users'
db.connect(mongoURL)

app.register(require('./routes/users-api'), {prefix: '/api/users'})

app.addHook('onRequest', (request, reply, done) => {
	console.log('Time', Date.now())
	done()
})

// Start the server
app.listen(3000, (err, address) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.log(`Server listening on ${address}`)
})