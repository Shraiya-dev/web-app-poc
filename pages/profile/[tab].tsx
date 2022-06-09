import { NextPage } from 'next'
import { useRouter } from 'next/router'

import ContractorDashboardLayout from '../../sdk/layouts/ContractorDashboardLayout'
import { useContractorAuth } from '../../sdk'
import Head from 'next/head'
import CompanyDetails from '../../modules/companyProfile/companyDetails'

const Profile: NextPage = () => {
	return (
		<>
			<Head>
				<title>Company Profile | Project Hero</title>
				<meta name='description' content='' />
			</Head>

			<ContractorDashboardLayout>
				<CompanyDetails />
			</ContractorDashboardLayout>
		</>
	)
}

export default Profile
