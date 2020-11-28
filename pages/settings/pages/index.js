import { Table } from 'antd'
import SettingsLayout from 'layouts/SettingsLayout'

export default function PagesIndex ({}) {
    const dataSource = []
    const showHeader = Boolean(dataSource.length)

    const table = { dataSource, showHeader }
	return (
		<SettingsLayout title='Pages'>
            <Table {...table} />
		</SettingsLayout>
	)
}