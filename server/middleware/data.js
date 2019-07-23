import Instance from '../Instance.js'

Instance.create('localhost')

export default () => {
    return (request, response, next) => {
        request.data = new Instance(request.hostname)
        next()
    }
}
