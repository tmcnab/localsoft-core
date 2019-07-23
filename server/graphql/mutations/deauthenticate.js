export default async (root, args, request) => {
    request.session = null
    return true
}
