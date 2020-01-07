import {createEnum} from '../enums'
import Link from 'next/link'
import List from 'components/List'
import {Component} from 'react'

export default class Header extends Component {

	static Type = createEnum('Hero', 'None', 'Simple')

	static propTypes = {
		type: Header.Type.validator.isRequired,
	}

	render = () => ({
		[Header.Type.Hero]: null,
		[Header.Type.None]: <></>,
		[Header.Type.Simple]:
			<header className='header'>
				<List>
					<Link href='/'>
						<a>Home</a>
					</Link>
					<Link href='/sign-in'>
						<a>Sign In</a>
					</Link>
				</List>
			</header>,
	})[this.props.type]
}
