import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { BasicDetailsForm } from '../modules/onboarding/components/BasicDetailsForm'

import ContractorDashboardLayout from '../sdk/layouts/ContractorDashboardLayout'
import { useContractorAuth } from '../sdk'
import Head from 'next/head'
import CompanyDetails from '../modules/companyProfile/companyDetails'

const Profile: NextPage = () => {
	const router = useRouter()
	const { logOut } = useContractorAuth()
	return (
		<>
			<Head>
				<title>Profile | Project Hero</title>
				<meta name='description' content='' />
			</Head>
			{/* <DashboardLayout> */}
			<ContractorDashboardLayout>
				{/* <BasicDetailsForm /> */}
				<CompanyDetails />
			</ContractorDashboardLayout>
			{/* </DashboardLayout> */}
		</>
	)
}

export default Profile
