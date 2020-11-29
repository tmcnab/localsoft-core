import { Button, Tooltip } from 'antd'

export default function ActionButton ({ title, ...props }) {
	return (
		<Tooltip placement='bottom' title={title}>
			<Button {...props} shape='circle' />
		</Tooltip>
	)
}
