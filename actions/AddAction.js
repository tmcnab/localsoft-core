import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'
import ActionButton from './ActionButton'
import FormDrawer from 'components/FormDrawer'

export default function AddAction ({ type }) {
	const [visible, setVisible] = useState(false)
	return (
		<>
			<ActionButton 
				icon={<PlusOutlined />}
				onClick={() => setVisible(true)} 
				title='Add'
			/>
			<FormDrawer type={type} visible={visible} />
		</>
	)
}