import { Form, Input } from 'antd'

export default function DomainForm ({ form }) {
	const rules = [{
		message: 'This field is required.',
		required: true,
	}]

	return (
		<Form form={form} layout='vertical' requiredMark={false} size='middle'>
			<Form.Item extra='A unique identifier for the domain. Cannot be changed once created. Required.' label='Subdomain' name='subdomain' rules={rules}>
				<Input placeholder='acme.localsoft.org' />
			</Form.Item>
			<Form.Item extra='Incoming requests to this alias will be forwarded to the tenant. Required.' label='Domain Alias' name='alias' rules={rules}>
				<Input placeholder='acme.org' />
			</Form.Item>
			<Form.Item label='Organization Name' name='organization'>
				<Input placeholder='Acme, Inc.' type='text' />
			</Form.Item>
			<Form.Item extra='The person who is responsible for this domain. Required.' label='Contact Name' name='name'>
				<Input placeholder='Sam Drew' type='text' />
			</Form.Item>
			<Form.Item label='Contact Phone Number' name='phone'>
				<Input placeholder='+1 123 456 7890' type='tel' />
			</Form.Item>
			<Form.Item label='Contact Email Address' name='email'>
				<Input placeholder='samd@acme.org' type='email' />
			</Form.Item>
		</Form>
	)
}