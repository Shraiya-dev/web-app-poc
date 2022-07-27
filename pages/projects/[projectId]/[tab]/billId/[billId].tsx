import { GetStaticPaths, GetStaticProps } from 'next'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'
import { BillDetails } from '../../../../../modules/bills'

const Details = () => {
	return (
		<>
			<BillDetails />
		</>
	)
}

export default Details

const pageUrl = '/projects/[projectId]/[tab]/billId/[billId]'
export const getStaticPaths: GetStaticPaths = staticRenderingProvider(pageUrl).getStaticPaths
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
