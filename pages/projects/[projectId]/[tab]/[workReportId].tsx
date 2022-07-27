import { GetStaticPaths, GetStaticProps } from 'next'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'
import { WorkReportDetails } from '../../../../modules/workReport'

const Details = () => {
	return (
		<>
			<WorkReportDetails />
		</>
	)
}

export default Details

const pageUrl = '/projects/[projectId]/[tab]/[workReportId]'
export const getStaticPaths: GetStaticPaths = staticRenderingProvider(pageUrl).getStaticPaths

export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
