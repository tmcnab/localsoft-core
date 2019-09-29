const allUsers = async () => {
	return [{email: 'joe@email.com'}]
}

const authenticateUser = async () => {
	return false
}

const currentUser = async () => {

}

const deauthenticateUser = async () => {

}

const findUsers = async () => {

}

export default ({
	Mutation: {
		authenticateUser,
		deauthenticateUser,
	},
	Query: {
		allUsers,
		currentUser,
		findUsers,
	}
})
