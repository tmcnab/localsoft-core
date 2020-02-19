import {Component} from 'react'
import Error from 'next/error'
import SimpleLayout from 'components/layouts/SimpleLayout'

export default class DynamicPage extends Component {

	render = () =>
		<SimpleLayout title='Help'>
			<Error statusCode={404} />
		</SimpleLayout>

}
