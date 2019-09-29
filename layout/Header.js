import {Layout} from 'antd'
import {createEnum} from '../enums'
import Link from 'next/link'
import {Component} from 'react'
import './Page.css'

export default class Header extends Component {

	static Type = createEnum('Hero', 'None', 'Simple')

	static propTypes = {
		type: Header.Type.validator.isRequired,
	}

	render = () => ({
		[Header.Type.Hero]: null,
		[Header.Type.None]: null,
		[Header.Type.Simple]:
			<Layout.Header>Header</Layout.Header>,

	})[this.props.type]
}
