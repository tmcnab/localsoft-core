import { Button, Tooltip } from 'antd'
import { PlusOutlined, QuestionOutlined } from '@ant-design/icons'
import Link from 'next/link'

export default function IndexActions ({ model }) {
	return (
		<>
			<Tooltip placement='left' title={`Add ${model}`}>
				<Button icon={<PlusOutlined />} shape='circle' />
			</Tooltip>
			<Tooltip placement='bottom' title='Help'>
				<Button icon={<QuestionOutlined />} shape='circle' />
			</Tooltip>
		</>
	)
}