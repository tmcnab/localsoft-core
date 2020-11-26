import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class CustomDocument extends Document {
	
	static async getInitialProps(context) {
		const {err, req, res} = context
		const initialProps = await Document.getInitialProps(context)
		return { ...initialProps }
	}

	render = () =>
		<Html>
			<Head />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>

}