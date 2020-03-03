import bcrypt from 'bcrypt'
import lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import uuidv5 from 'uuid/v5'

// TODO: replace with actual db lookups.
const accounts = new Map()				// Email to Hash
const authorizations = new Map()	// Auths to Email
const admindb = lowdb(new FileSync('.data/accounts.json'))
admindb.defaults({
	accounts: [],
	users: [],
}).write()

class Context {

	#req = null
	#res = null

	constructor ({req, res}) {
		this.#req = req
		this.#res = res
		this.domain = req.headers.host === 'localhost:42069'
			? 'localhost.dev'
			: req.headers.host
	}

	get authenticated () {
		return this.authorization.has(this.token)
	}

	get db () {
		const filename = `.data/${this.domain}.json`
		const adapter = new FileSync(filename)
		const sitedb = lowdb(adapter)

		sitedb.defaults({
			people: []
		}).write()

		return {
			admin: admindb,
			site: sitedb,
		}
	}

	get namespace () {
		return uuidv5(this.domain, uuidv5.DNS)
	}

	get identity () {
		return this.authenticated ? authorizations.get(this.token) : null
	}

	get token () {
		return this.#req.headers.authorization || null
	}

	async authenticate (email, password) {
		let authorization = null

		const identity = email.trim().toLowerCase()
		const recordedHash = accounts.get(identity)
		const authenticated = await bcrypt.compare(password, recordedHash)

		if (authenticated) {
			authorization = uuidv5(identity, this.namespace)
			authorizations.set(authorization, identity)
		}

		return authorization
	}

	async register (email, password) {
		const identity = email.trim.toLowerCase()
		const hash = await bcrypt.hash(password)
		accounts.set(identity, hash)

		const authorization = uuidv5(identity, this.namespace)
		authorizations.set(authorization, identity)

		return authorization
	}

}

export default (integrationContext) => new Context(integrationContext)
