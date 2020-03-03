import {Component} from 'react'
import en from 'javascript-time-ago/locale/en'
import formattr from 'formattr'
import {instanceOf, number, object, oneOf, oneOfType, string} from 'prop-types'
import JavascriptTimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'
import {Tag} from 'antd'

JavascriptTimeAgo.locale(en)

export default class Format extends Component {

	static propTypes = {
		type: oneOf([
			'shortname',
			'tags',
			'timeago',
		]).isRequired,
		value: oneOfType([
			instanceOf(Date),
			number,
			object,
			string,
		]),
	}

	shortname = (v) =>
		formattr.formatName('{last}, {f} {m}', v.familyName, v.givenName, v.additionalName)

	tags = (v) =>
		<>{v.tags.map((s, i) => <Tag key={`tag:${i}:${s}`}>{s}</Tag>)}</>

	timeago = (date) => {
		return date ? <ReactTimeAgo date={date} /> : null
	}

	render = () => {
		const {type, value} = this.props
		return this[type](value)
	}

}
