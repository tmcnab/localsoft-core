import {oneOf} from 'prop-types'

export const gql = `
	enum AuthenticationScheme {
		EMAIL
	}
`

export const AuthenticationScheme = Object.freeze({
	'EMAIL': 'EMAIL',
})

export const authenticationSchemePropType =
	oneOf(Object.values(AuthenticationScheme))
