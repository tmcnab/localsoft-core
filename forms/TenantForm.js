import { Form, Input } from 'antd'

export default function DomainForm ({ id, form }) {

	const rules = [{
		message: 'This field is required.',
		required: true,
	}]

	return (
		<Form form={form} layout='vertical' requiredMark={false} size='middle'>
			<Form.Item label='Subdomain' name='subdomain' rules={rules} tooltip='A unique identifier for the domain. Cannot be changed once created. Required.'>
				<Input placeholder='acme.localsoft.org' />
			</Form.Item>
			<Form.Item label='Domain Alias' name='alias' rules={rules} tooltip='Incoming requests to this alias will be forwarded to the tenant. Required.'>
				<Input placeholder='acme.org' />
			</Form.Item>
			<Form.Item label='Organization' name='organization' rules={rules} tooltip='Name of the company or organization responsible for this tenant. Required.'>
				<Input placeholder='Acme, Inc.' type='text' />
			</Form.Item>
			<Form.Item label='Name' name='name' tooltip='The person who is responsible for this domain. Required.'>
				<Input placeholder='Sam Drew' type='text' />
			</Form.Item>
			<Form.Item label='Phone Number' name='phone'>
				<Input placeholder='+1 123 456 7890' type='tel' />
			</Form.Item>
			<Form.Item label='Email Address' name='email'>
				<Input placeholder='samd@acme.org' type='email' />
			</Form.Item>
		</Form>
	)
}