import { Tag } from 'antd'

export default function TenantStatusTag ({ status }) {
	const color = ({
		'Active': 'green',
		'Inactive': 'blue',
		'Suspended': 'red',
	})[status]

	const style = {
		textAlign: 'center',
		textTransform: 'uppercase',
		minWidth: 90,
	}

	return <Tag color={color} style={style}>{status}</Tag>
}