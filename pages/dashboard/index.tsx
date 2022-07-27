import { GetStaticProps, NextPage } from 'next'
import ContractorDashboardLayout from '../../sdk/layouts/ContractorDashboardLayout'
import { ProjectDashboard } from '../../modules/projectDashboard/components/projectDashboard'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'
const DashboardPage: NextPage = () => {
	return (
		<>
			<ContractorDashboardLayout>
				<ProjectDashboard />
			</ContractorDashboardLayout>
		</>
	)
}

export default DashboardPage

const pageUrl = '/dashboard'
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
