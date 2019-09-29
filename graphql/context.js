class Context {

	constructor (req, res) {
		this._req = req
		this._res = res

	}

	get isDevelopmentEnvironment () {
		return process.env.NODE_ENV === 'development'
	}

	get isProductionEnvironment () {
		return process.env.NODE_ENV === 'production'
	}

	get domain () {
		return this._req.headers.host
	}
}

export default ({req, res}) => new Context(req, res)
