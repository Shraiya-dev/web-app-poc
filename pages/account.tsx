import { NextPage } from 'next'
import Head from 'next/head'
import PersonalAccount from '../modules/account/components/personalAccount'

import ContractorDashboardLayout from '../sdk/layouts/ContractorDashboardLayout'

const Account: NextPage = () => {
	return (
		<>
			<Head>
				<title>Create Profile | Project Hero</title>
				<meta name='description' content='' />
			</Head>
			<ContractorDashboardLayout>
				<PersonalAccount />
			</ContractorDashboardLayout>
		</>
	)
}

export default Account
