import db from '../db.js'

export default {
    mutations: {},
    queries: {
        conversations: async (root, args, {session}) => {
            // Only return the channels the user has authorization to view.
            return db.conversations
                .filter(c => c.access.includes(session.role))
                .map(c => ({
                    access: c.access,
                    description: c.description,
                    messages: null,
                    name: c.name,
                    participants: c.participants
                }))
                .value()
        }
    },
    resolvers: {},
    schema: `
        type Message {
            author: Person!
            content: String!
            contentType: String!
            hash: ID!
            when: Date!
        }

        input MessageInput {
            content: String!
        }

        type Conversation extends Record {
            # People with this authorization will be able to read this conversation.
            access: [Role!]!

            # A general description of this conversation (optional).
            description: String

            # Messages in this conversation.
            messages: [Message!]!

            # The name of this conversation.
            name: String!

            # People who are actively participating in this conversation (i.e. have it favorited).
            participants: [Person!]!
        }

        input ConversationInput {
            access: [Role!]!
            description: String
            icon: String
            name: String!
        }

        extend type Mutation {
            # Create a conversation.
            createConversation(input: ConversationInput!): Boolean!

            # Add a message to a conversation.
            createMessage(input: MessageInput!): Boolean!
        }

        extend type Query {
            # Retrieve all conversations. Will return no message children.
            conversations: [Conversation!]!

            # Retrieve a single Conversation record. Will only return (at most) 50 message children.
            conversation(identifier: ID!): Conversation
        }
    `
}
