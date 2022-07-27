import { Plans } from 'landing'
import { GetStaticProps, NextPage } from 'next'
import { LandingLayout } from 'sdk'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'

const Page: NextPage = () => {
	return (
		<>
			<LandingLayout>
				<Plans />
			</LandingLayout>
		</>
	)
}
export default Page

const pageUrl = '/hero/plans'
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
