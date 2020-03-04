import {Button, PageHeader, Tooltip} from 'antd'
import {Component} from 'react'
import contextualize from 'contextualize'
import DashboardLayout from 'components/layouts/DashboardLayout'
import PersonTable from 'components/people/PersonTable'
import {PlusOutlined, QuestionOutlined, UploadOutlined} from '@ant-design/icons'

export default class PeopleIndexPage extends Component {

	static getInitialProps = async (args) => {
		// const ctx = contextualize(args)
		// return await ctx.gql(`{
		//   ${PersonTable.query}
		// }`)
		return {
			dataSource: []
		}
	}

	static propTypes = {
		dataSource: PersonTable.propTypes.dataSource,
	}

	extra =
		<>
			<Tooltip title='New Person'>
				<Button disabled icon={<PlusOutlined />} shape='circle' />
			</Tooltip>
			<Tooltip title='Upload Data'>
				<Button disabled icon={<UploadOutlined />} shape='circle' />
			</Tooltip>
			<Tooltip title='Help'>
				<Button disabled icon={<QuestionOutlined />} shape='circle' />
			</Tooltip>
		</>

	footer =
		<PersonTable dataSource={this.props.dataSource} />

	render = () =>
		<DashboardLayout path='/people'>
			<PageHeader extra={this.extra} footer={this.footer} title='People' />
		</DashboardLayout>

}
