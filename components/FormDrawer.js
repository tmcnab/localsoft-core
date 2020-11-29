import { bool, oneOf, string } from 'prop-types'
import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { Drawer, Form, PageHeader } from 'antd'
import ActionButton from 'actions/ActionButton'
import forms from 'forms'

export default function FormDrawer ({ id, type, visible }) {
	const extra = [
		<ActionButton icon={<CheckOutlined />} title='Save' />,
		<ActionButton danger icon={<CloseOutlined />} onClick={() => setVisible(false)} title='Cancel' />,
	]

	const title = <PageHeader extra={extra} title={`${id ? 'Edit' : 'Add'} ${type}`} />

	const CustomForm = forms(type)
	const [form] = Form.useForm()

	return (
		<Drawer 
			children={<CustomForm form={form} id={id} />}
			closable={false}
			title={title}
			visible={visible}
			width='50vw'
		/>
	)
}

FormDrawer.propTypes = {
	id: string,
	type: oneOf([
		'tenant',
	]),
	visible: bool.isRequired,
}