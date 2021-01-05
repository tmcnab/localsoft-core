import Link from 'next/link'
import getConfig from 'next/config'

export default function SubdomainLink ({ children, subdomain }) {
	const href = getConfig().publicRuntimeConfig.env === 'development' 
		? `http://${subdomain}.localhost:3000/`
		: `https://${subdomain}.localsoft.org:3000/`

	return (
		<Link href={href}>{children}</Link>
	)
}