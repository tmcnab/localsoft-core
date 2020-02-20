import {Col, Form, Input, Row, Select} from 'antd'
import {Component} from 'react'
import FormSection from 'components/FormSection'

export default class PersonForm extends Component {

	render = () =>
		<>
			<FormSection title='Contact'>
				<Row gutter={8}>
					<Col span={8}>
						<Form.Item label='Given'>
							<Input name='givenName' placeholder='Given Name' />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item label='Additional'>
							<Input name='additionalName' placeholder='Additional Name' />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item label='Family'>
							<Input name='familyName' placeholder='Family Name' />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={8}>
					<Col span={8}>
						<Form.Item label='Email'>
							<Input name='email' placeholder='user@domain.com' type='email' />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item label='Telephone'>
							<Input name='telephone' placeholder='+1 (123) 456-7890' />
						</Form.Item>
					</Col>
				</Row>
			</FormSection>
			<FormSection title='Address'>
				<Row gutter={8}>
					<Col span={16}>
						<Form.Item label='Street'>
							<Input name='address.street' placeholder='123 Main St' />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item label='Post Office Box'>
							<Input name='address.postOfficeBox' placeholder='12345' />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={8}>
					<Col span={8}>
						<Form.Item label='Locality'>
							<Input name='address.locality' placeholder='Suburb / Town / City' />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item label='Region'>
							<Input name='address.region' placeholder='Province / State / Territory' />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item label='Country'>
							<Select name='address.country' placeholder='Country'>
								<Select.Option value='USA'>United States of America</Select.Option>
							</Select>
						</Form.Item>
					</Col>
				</Row>
			</FormSection>
			<FormSection title='Meta'>
				<Row gutter={8}>
					<Col span={12}>
						<Form.Item label='Tags'>
							<Select mode='tags' name='tags' placeholder='Tags' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='Description'>
							<Input.TextArea name='description' placeholder='Description / Notes' rows={4}/>
						</Form.Item>
					</Col>
				</Row>
			</FormSection>
		</>

}
