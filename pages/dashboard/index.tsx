import { NextPage } from 'next'
import React from 'react'
import { Dashboard } from '../../modules/dashboard'
import DashboardLayout from '../../sdk/layouts/DashboardLayout'
import ContractorDashboardLayout from '../../sdk/layouts/ContractorDashboardLayout'

import Head from 'next/head'
import { ProjectDashboard } from '../../modules/projectDashboard/components/projectDashboard'
const DashboardPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Dashboard | Project Hero</title>
				<meta name='description' content='' />
			</Head>
			<ContractorDashboardLayout>
				{/* <Dashboard /> */}
				<ProjectDashboard />
			</ContractorDashboardLayout>
		</>
	)
}

export default DashboardPage
