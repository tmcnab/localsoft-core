import bcrypt from 'bcrypt'
import db from '../db'
import {Roles} from '../enums'
import uuid from 'uuid/v4'

export default {
    mutations: {
        authenticate: async (root, args, req) => {
            const email = args.email.toLowerCase()

            // Fetch person and if doesn't exists return nothing, no error.
            const person = db.people.find({email}).value()
            if (!person) {
                return null
            }

            // If the password doesn't match, return nothing, no error.
            const challengeSucceeded = await bcrypt.compare(args.password, person.hash)
            if (!challengeSucceeded) {
                return null
            }

            // Set session+cookie and return record
            req.session = {
                identifier: person.identifier,
                role: person.role
            }
            return person
        },
        deauthenticate: async (root, args, req) => {
            req.session = null
            return true
        },
        destroyPerson: async (root, {identifier}, {session}) => {
            // No-one can destroy themselves.
            if (identifier === session.identifier) {
                return false
            }

            // Only authorized users may destroy other person records.
            if (!session.hasRole(Roles.STAFF, Roles.ADMINISTRATOR)) {
                return false
            }

            // Ensure we don't delete the only administrator.
            const administratorCount = db.people
                .filter(['role', Roles.ADMINISTRATOR])
                .size()
                .value()
            if (administratorCount <= 1) {
                return false
            }

            // Staff cannot delete administrators.
            const record = db.people.find({identifier}).value()
            if (session.role === Roles.STAFF && record.role === Roles.ADMINISTRATOR) {
                return false
            }

            // Finally destroy the record.
            db.people.remove({identifier}).write()
            return true
        },
        savePerson: async (root, args, req) => {
            if ([Roles.STAFF, Roles.ADMINISTRATOR].includes(req.session.role)) {
                const identifier = args.input.identifier
                const record = identifier ? db.people.find({identifier}).value() : null

                if (record) {
                    const replacementRecord = Object.assign({}, record, args.input)
                    db.people
                        .find({identifier})
                        .assign(replacementRecord)
                        .write()
                } else {
                    const newRecord = Object.assign({}, args.input, {
                        created: new Date().toISOString(),
                        identifier: uuid()
                    })
                    db.people.push(newRecord).write()
                }
                return true
            } else {
                return false
            }
        }
    },
    queries: {
        currentUser: async (root, args, {session}) => {
            const {identifier} = session
            return identifier
                ? db.people.find({identifier}).value()
                : {
                      role: Roles.ANONYMOUS
                  }
        },
        people: async (root, args, req) => {
            if (req.session.hasRole(Roles.STAFF, Roles.ADMINISTRATOR)) {
                return db.people.value()
            } else {
                return []
            }
        },
        peopleTags: async (root, args, req) => {
            if (req.session.hasRole(Roles.STAFF, Roles.ADMINISTRATOR)) {
                return db.people
                    .map('tags')
                    .flatten()
                    .uniq()
                    .value()
            } else {
                return []
            }
        },
        person: async (root, {identifier}, {session}) => {
            if (['STAFF', 'ADMINISTRATOR'].includes(session.role)) {
                return db
                    .get('people')
                    .find({identifier})
                    .value()
            } else {
                throw new Error('Unauthorized')
            }
        }
    },
    resolvers: {},
    schema: `
        type Preferences {
            email: Boolean
            telephone: Boolean
        }

        input PreferencesInput {
            email: Boolean
            telephone: Boolean
        }

        type Person inherits Record {
            additionalName: String
            address: PostalAddress
            email: String
            familyName: String
            givenName: String
            preferences: Preferences!
            role: Role!
            telephone: String
        }

        input PersonInput {
            additionalName: String
            address: PostalAddressInput
            email: String
            familyName: String
            givenName: String
            identifier: ID
            preferences: PreferencesInput!
            role: Role!
            tags: [String!]!
            telephone: String
        }

        extend type Mutation {
            # Generate credentials/session for the current user if successfully authenticated.
            authenticate (email: String!, password: String!): Person

            # Revoke credentials/session for the current user.
            deauthenticate: Boolean

            # Destroy a Person record.
            destroyPerson(identifier: ID!): Boolean!

            # Save a Person record.
            savePerson(input: PersonInput): Boolean!
        }

        extend type Query {
            # The current, logged-in Person.
            currentUser: Person

            # All Person records.
            people: [Person]

            # Unique list of tags that have been applied to all Person records.
            peopleTags: [String!]!

            # Retrieve a single Person record.
            person(identifier: ID!): Person
        }
    `
}
