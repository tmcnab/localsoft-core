export default ({email, hostname, password}) => `

Hi there!

You have a new account on ${hostname}:

> Email: \`${email}\`
>
> Password: \`${password}\`

You can sign into your account [here](${hostname}/sign-in).

`
