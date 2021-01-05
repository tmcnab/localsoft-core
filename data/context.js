export default async ({ req, res }) => {
	return {
		env: {
			development: process.env.NODE_ENV === 'development'
		},
	}
}