import { Table } from 'antd'
import SettingsLayout from 'layouts/SettingsLayout'

export default function PeopleIndex ({}) {
    const dataSource = []
    const showHeader = Boolean(dataSource.length)

    const table = { dataSource, showHeader }
	return (
		<SettingsLayout title='People'>
            <Table {...table} />
		</SettingsLayout>
	)
}