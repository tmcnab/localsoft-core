import { Drawer } from 'antd'
import { QuestionOutlined } from '@ant-design/icons'
import { useState } from 'react'
import ActionButton from './ActionButton'
import help from 'help'
import ReactMarkdown from 'react-markdown'

export default function HelpAction ({ topic }) {
	const [visible, setVisible] = useState(false)
	return (
		<>
			<ActionButton 
				icon={<QuestionOutlined />}
				onClick={() => setVisible(true)} 
				title='Help' 
			/>
			<Drawer 
				children={<ReactMarkdown children={help(topic)} />}
				onClose={() => setVisible(false)} 
				title={topic} 
				visible={visible} 
				width='50vw'
			/>
		</>
	)
}