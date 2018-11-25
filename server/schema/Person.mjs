import {db} from '../config'
import bcrypt from 'bcrypt'


export default ({
    mutations: {
        authenticate: async (root, args, req) => {
            const email = args.email.toLowerCase()

            // Fetch person and if doesn't exists return nothing, no error.
            const person = db.get('people').find({ email }).value()
            if (!person) {
                console.log('no person found')
                return null
            }

            // If the password doesn't match, return nothing, no error.
            if (!await bcrypt.compare(args.password, person.hash)) {
                console.log('password failed to match')
                return null
            }

            // Set session+cookie and return record.
            req.session = {
                identifier: person.identifier,
                role: person.role,
            }

            console.log(person)
            return person
        },
    },
    queries: {
        currentUser: async (root, args, req) => {
            const { identifier } = req.session
            return identifier
                ? db.get('people').find({ identifier }).value()
                : null
        },
        people: async (root, args, req) => {
            const { role } = req.session
            if (['STAFF', 'ADMINISTRATOR'].includes(role)) {
                return db.get('people')
            } else {
                throw new Error('Unauthorized')
            }
        }
    },
    resolvers: {},
    schema: `
        type Person {
            additionalName: String
            email: String
            familyName: String
            givenName: String
            identifier: ID!
            memberOf: [String]
            role: Role!
            telephone: String
        }

        extend type Mutation {
            authenticate (email: String!, password: String!): Person
        }

        extend type Query {
            people: [Person]
            currentUser: Person
        }
    `
})
