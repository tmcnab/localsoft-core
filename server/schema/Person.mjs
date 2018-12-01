import {db} from '../config'
import bcrypt from 'bcrypt'


export default ({
    mutations: {
        authenticate: async (root, args, req) => {
            const email = args.email.toLowerCase()

            // Fetch person and if doesn't exists return nothing, no error.
            const person = db.get('people').find({ email }).value()
            if (!person) {
                return null
            }

            // If the password doesn't match, return nothing, no error.
            if (!await bcrypt.compare(args.password, person.hash)) {
                return null
            }

            // Set session+cookie and return record
            req.session = {
                identifier: person.identifier,
                role: person.role,
            }
            return person
        },
        deauthenticate: async (root, args, req) => {
            req.session = null
            return true
        },
    },
    queries: {
        // TODO: this should return a person instead of null, but only field is role=ANONYMOUS [@tmcnab]
        currentUser: async (root, args, req) => {
            const { identifier } = req.session
            return identifier
                ? db.get('people').find({ identifier }).value()
                : null
        },
        people: async (root, args, req) => {
            const { role } = req.session
            if (['STAFF', 'ADMINISTRATOR'].includes(role)) {
                return db.get('people').value()
            } else {
                throw new Error('Unauthorized')
            }
        },
        person: async (root, {identifier}, {session}) => {
            if (['STAFF', 'ADMINISTRATOR'].includes(session.role)) {
                return db.get('people').find({identifier}).value()
            } else {
                throw new Error('Unauthorized')
            }
        }
    },
    resolvers: {},
    schema: `
        type Address {
            country: String
            locality: String
            postalCode: String
            region: String
            streetAddress: String
        }

        type Name {
            additional: String
            family: String
            given: String
        }

        type Preferences {
            email: Boolean
        }

        type Person {
            address: Address
            email: String
            identifier: ID!
            name: Name
            preferences: Preferences!
            role: Role!
            tags: [String!]!
            telephone: String
        }

        extend type Mutation {
            authenticate (email: String!, password: String!): Person
            deauthenticate: Boolean
        }

        extend type Query {
            people: [Person]
            person(identifier:ID!): Person
            currentUser: Person
        }
    `
})
