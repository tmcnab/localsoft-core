export default ({
    mutations: {
        authenticate: async (root, args, req) => {
            // TODO
            if (args.email === 'admin@domain.tld' && args.password === 'password') {
                req.session.identifier = 'YWRtaW5AZG9tYWluLnRsZA=='
                return {
                    additionalName: null,
                    email: 'admin@domain.tld',
                    givenName: null,
                    familyName: 'Administrator',
                    memberOf: [],
                    telephone: null,
                }
            }
        },
    },
    queries: {
        people: async (root, args, req) => {
            return []   // TODO
        }
    },
    resolvers: {},
    schema: `
        type Person inherits Thing {
            additionalName: String
            email: String
            givenName: String
            familyName: String
            memberOf: [String]
            telephone: String
        }

        extend type Mutation {
            authenticate (email: String!, password: String!): Person
        }

        extend type Query {
            people: [Person]
        }
    `
})
