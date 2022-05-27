import { NextPage } from 'next'
import React from 'react'
import { Dashboard } from '../../modules/dashboard'
import DashboardLayout from '../../sdk/layouts/DashboardLayout'
import ContractorDashboardLayout from '../../sdk/layouts/ContractorDashboardLayout'
import Title from 'next/head'

import Head from 'next/head'
import { ProjectDashboard } from '../../modules/projectDashboard/components/projectDashboard'
const DashboardPage: NextPage = () => {
	return (
		<>
			<Head>
				<Title>Dashboard | Project Hero</Title>
				<meta name='Dashboard' content='' />
			</Head>
			<ContractorDashboardLayout>
				{/* <Dashboard /> */}
				<ProjectDashboard />
			</ContractorDashboardLayout>
		</>
	)
}

export default DashboardPage
