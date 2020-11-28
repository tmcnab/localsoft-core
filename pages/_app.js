import '../styles/globals.less'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client'
import { useMemo } from 'react'
import merge from 'deepmerge'

let apolloClient

function createIsomorphLink() {
	if (typeof window === 'undefined') {
		const { SchemaLink } = require('@apollo/client/link/schema')
		const { schema } = require('../schema')
		return new SchemaLink({ schema })
	} else {
		const { HttpLink } = require('@apollo/client/link/http')
		return new HttpLink({
			uri: '/api/graphql',
			credentials: 'same-origin',
		})
  }
}

function createApolloClient() {
	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link: createIsomorphLink(),
		cache: new InMemoryCache(),
	})
}

function initializeApollo(initialState = null) {
	const _apolloClient = apolloClient ?? createApolloClient()
  
	// If your page has Next.js data fetching methods that use Apollo Client, the initial state
	// get hydrated here
	if (initialState) {
	  // Get existing cache, loaded during client side data fetching
	  const existingCache = _apolloClient.extract()
  
	  // Merge the existing cache into data passed from getStaticProps/getServerSideProps
	  const data = merge(initialState, existingCache)
  
	  // Restore the cache with the merged data
	  _apolloClient.cache.restore(data)
	}
	// For SSG and SSR always create a new Apollo Client
	if (typeof window === 'undefined') return _apolloClient
	// Create the Apollo Client once in the client
	if (!apolloClient) apolloClient = _apolloClient
  
	return _apolloClient
  }

function useApollo(initialState) {
	 return useMemo(() => initializeApollo(initialState), [initialState])
}

export default function LocalsoftApp({ Component, pageProps }) {
	const apolloClient = useApollo(pageProps.initialApolloState)
	return (
		<ApolloProvider client={apolloClient}>
			<Component {...pageProps} />
		</ApolloProvider>
	)
}