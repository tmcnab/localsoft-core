export default async (root, args, {user}) => {
    return await user.get()
}
