import { FAQ } from 'landing'
import { GetStaticProps, NextPage } from 'next'
import { LandingLayout } from 'sdk'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'

const Page: NextPage = () => {
	return (
		<>
			<LandingLayout>
				<FAQ />
			</LandingLayout>
		</>
	)
}
export default Page

const pageUrl = '/faq'
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
