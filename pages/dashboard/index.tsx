import { NextPage } from 'next'
import React from 'react'
import { Dashboard } from '../../modules/dashboard'
import DashboardLayout from '../../sdk/layouts/DashboardLayout'

const DashboardPage: NextPage = () => {
	return (
		<DashboardLayout>
			<Dashboard />
		</DashboardLayout>
	)
}

export default DashboardPage
