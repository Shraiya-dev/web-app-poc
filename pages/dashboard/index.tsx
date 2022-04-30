import { NextPage } from 'next'
import React from 'react'
import { Dashboard } from '../../modules/dashboard'
import DashboardLayout from '../../sdk/layouts/DashboardLayout'

import Head from 'next/head'
const DashboardPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Dashboard | Project Hero</title>
				<meta name='description' content='' />
			</Head>
			<DashboardLayout>
				<Dashboard />
			</DashboardLayout>
		</>
	)
}

export default DashboardPage
