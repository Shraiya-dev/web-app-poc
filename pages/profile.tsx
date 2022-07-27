import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import Head from 'next/head'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'
import CompanyDetails from '../modules/companyProfile/companyDetails'
import { useContractorAuth } from '../sdk'
import ContractorDashboardLayout from '../sdk/layouts/ContractorDashboardLayout'

const Profile: NextPage = () => {
	const router = useRouter()
	const { logOut } = useContractorAuth()
	return (
		<>
			<ContractorDashboardLayout>
				<CompanyDetails />
			</ContractorDashboardLayout>
		</>
	)
}

export default Profile

const pageUrl = '/profile'
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
