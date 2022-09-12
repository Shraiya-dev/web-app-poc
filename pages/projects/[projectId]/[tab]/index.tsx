import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'
import { ProjectDetails } from '../../../../modules/projectDetails/projectDetails'
import ContractorDashboardLayout from '../../../../sdk/layouts/ContractorDashboardLayout'

const TabPage: NextPage = () => {
	const router = useRouter()
	return (
		<>
			<ContractorDashboardLayout>
				<ProjectDetails />
			</ContractorDashboardLayout>
		</>
	)
}
export default TabPage

const pageUrl = '/projects/[projectId]/[tab]'
export const getStaticPaths: GetStaticPaths = staticRenderingProvider(pageUrl).getStaticPaths
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
