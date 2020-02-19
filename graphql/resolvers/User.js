const authenticate = async (root, args, ctx) => {
	// If user is already authenticated just return authorization.
	if (ctx.authenticated) {
		return {
			authorization: ctx.authorization,
			error: false,
			errorMessage: '',
			success: true,
		}
	}



	return {
		authorization: null,
		error: true,
		errorMessage: 'Not Implemented',
		success: false,
	}
}

const currentUser = async () => {

}

const deauthenticateUser = async () => {

}

const allUsers = async () => {

}

const findUsers = async () => {

}

export default ({
	Mutation: {
		authenticate,
		deauthenticateUser,
	},
	Query: {
		allUsers,
		currentUser,
		findUsers,
	}
})
