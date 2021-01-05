import { Button, Tooltip } from 'antd'
import { CheckOutlined, DeleteOutlined, QuestionOutlined } from '@ant-design/icons'

export default function EditActions ({ }) {
	return (
		<>
			<Tooltip key='save' placement='left' title='Save'>
				<Button icon={<CheckOutlined />} shape='circle' type='primary' />
			</Tooltip>
			<Tooltip key='delete' placement='bottom' title='Delete'>
				<Button danger icon={<DeleteOutlined />} shape='circle' type='primary' />
			</Tooltip>
			<Tooltip key='help' placement='bottom' title='Help'>
				<Button icon={<QuestionOutlined />} shape='circle' />
			</Tooltip>
		</>
	)
}