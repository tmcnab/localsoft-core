import s2s from 'graphql-s2s'
import tools from 'graphql-tools'


const schema = `
	type Node {
		id: ID!
	}

	type Person inherits Node {
		firstname: String
		lastname: String
	}

	type Student inherits Person {
		nickname: String
	}

	type Query {
	  students: [Student]
	}
`

const resolver = {
        Query: {
            students(root, args, context) {
				// replace this dummy code with your own logic to extract students.
                return [{ id: 1, firstname: "Carry", lastname: "Connor", nickname: "Cannie" }]
            }
        }
    };

export default tools.makeExecutableSchema({
  typeDefs: [s2s.graphqls2s.transpileSchema(schema)],
  resolvers: resolver
})
