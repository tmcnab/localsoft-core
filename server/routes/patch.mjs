import db from '../db'
import uuid from 'uuid/v4'


export default async (request, response, next) => {
    const {resource} = request.params
    const {identifier} = request.body

    // TODO: check that it's a valid resource
    // TODO: check that the user is authorized to create/update resource
    // TODO: schema validation probably

    if (identifier) {
        db.get(resource).find({identifier}).assign({
            ...db.get(resource).find({identifier}).value(),
            ...request.body,
        }).write()
    } else {
        db.get(resource).push({
            ...request.body,
            identifier: uuid(),
        }).write()
    }

    response.json({error:null})
}
