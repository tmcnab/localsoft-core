import { Button, Form, Modal, Tooltip } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'
import DomainForm from './DomainForm'

export default function AddDomainAction ({ onClose }) {	
	const [visible, setVisible] = useState(false)

	const [form] = Form.useForm()

	const onCancel = () => {
		form.resetFields()
		setVisible(false)
	}

	const onOk = async () => {
		try {
			const values = await form.validateFields()
			console.info(values)
		} catch (error) {
			console.warn(error)
		}
		
	}

	const modal = {
		closable: false, 
		okText: 'Add Domain',
		onCancel,
		onOk,
		visible,
	}
	
	return (
		<>
			<Tooltip placement='left' title='Add Domain'>
				<Button icon={<PlusOutlined />} onClick={() => setVisible(true)} shape='circle' />
			</Tooltip>
			<Modal {...modal}>
				<DomainForm form={form} />
			</Modal>
		</>
	)
}