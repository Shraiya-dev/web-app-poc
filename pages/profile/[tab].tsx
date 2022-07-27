import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { staticRenderingProvider } from 'sdk/utils/nextHelper'
import CompanyDetails from '../../modules/companyProfile/companyDetails'
import ContractorDashboardLayout from '../../sdk/layouts/ContractorDashboardLayout'

const Profile: NextPage = () => {
	return (
		<>
			<ContractorDashboardLayout>
				<CompanyDetails />
			</ContractorDashboardLayout>
		</>
	)
}

export default Profile

const pageUrl = '/profile/[tab]'
export const getStaticPaths: GetStaticPaths = staticRenderingProvider(pageUrl).getStaticPaths
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
