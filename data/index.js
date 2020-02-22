import NeDB from 'nedb'

export default class Data {

	#db = null

	constructor (domain) {
		this.#db = new NeDB({
			autoload: true,
			corruptAlertThreshold: 0,
			filename: '.data/#{domain}.db',
		})
	}

	async find ()

	async insert (document) {
		return await new Promise((resolve, reject) => {
			this.#db.insert(document, (error, record) => {
				error ? reject(error) : resolve(record)
			})
		})
	}


}
