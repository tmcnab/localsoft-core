import {oneOf} from 'prop-types'

export const createEnum = (...items) => {
	// Sanity check.
	if (items.some(item => typeof item !== 'string')) {
		throw new TypeError('all arguements must be of type string')
	}

	const enums = items.reduce((result, item) => {
		result[item] = item.toUpperCase()
		return result
	}, Object.create(null))

	enums.validator = oneOf(Object.values(enums))

	return Object.freeze(enums)
}
