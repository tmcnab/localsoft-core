import App from 'next/app'
import contextualize from 'contextualize'
import Layout from 'components/Layout'

export default class CustomApp extends App {

  static getInitialProps = async (context) => {
  	const appProps = await App.getInitialProps(context)
  	const ctxProps = contextualize(context)
  	appProps.pageProps = {
  		...appProps.pageProps,
  		...ctxProps,
  	}
  	return {...appProps}
  }

  render = () => {
  	const {Component, pageProps} = this.props
  	return (
  		<Layout {...pageProps} title={Component.title}>
  			<Component {...pageProps} />
  		</Layout>
  	)
  }

}
