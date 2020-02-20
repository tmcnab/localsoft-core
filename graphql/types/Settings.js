export const gql = `

type KeyValuePair {
	key: String!
	value: String!
}

type GeneralSettings {
	name: String!
}

# See also: https://htmlhead.dev/
type PagesSettings {
	link: [KeyValuePair!]!
	meta: [KeyValuePair!]!
}

type Settings {
	general: GeneralSettings!
	pages: PagesSettings!
}

extend type Query {
	settings: Settings!
}

`

const settings = async () => {
	return {
		general: {
			name: 'Localsoft',
		},
		pages: {
			link: [],
			meta: [],
		}
	}
}

export const resolvers = ({
	Mutation: {},
	Query: {
		settings,
	}
})
