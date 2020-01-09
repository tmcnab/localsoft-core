import {createEnum} from '../enums'
import {Component} from 'react'
import SimpleHeader from './Header.Simple'


export default class Header extends Component {

	static Type = createEnum('Hero', 'None', 'Simple')

	static propTypes = {
		type: Header.Type.validator.isRequired,
	}

	render = () => ({
		[Header.Type.Hero]: null,
		[Header.Type.None]: <></>,
		[Header.Type.Simple]: <SimpleHeader />,
	})[this.props.type]
}
