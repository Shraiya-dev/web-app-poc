import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'
import { WorkerProfileInfo } from '../../modules/workerDetails/components/WorkerDetails'
import DashboardLayout from '../../sdk/layouts/DashboardLayout'

const WorkerProfile: NextPage = () => {
	return (
		<DashboardLayout>
			<WorkerProfileInfo />
		</DashboardLayout>
	)
}

export default WorkerProfile

const pageUrl = '/worker/[workerId]'
export const getStaticPaths: GetStaticPaths = staticRenderingProvider(pageUrl).getStaticPaths
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
