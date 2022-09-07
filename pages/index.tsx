import { Home } from 'landing'
import { GetStaticProps, NextPage } from 'next'
import { LandingLayout } from 'sdk'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'

const HomePage: NextPage = () => {
	return (
		<>
			<LandingLayout>
				<Home />
			</LandingLayout>
		</>
	)
}

export default HomePage

const pageUrl = '/'
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
