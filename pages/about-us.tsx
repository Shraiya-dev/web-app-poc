import { AboutUs } from 'landing/AboutUs'
import { GetStaticProps, NextPage } from 'next'
import { LandingLayout } from 'sdk'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'

const Page: NextPage = () => {
	return (
		<>
			<LandingLayout>
				<AboutUs />
			</LandingLayout>
		</>
	)
}

export default Page

const pageUrl = '/about-us'
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
