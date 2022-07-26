import { Home } from 'landing'
import { AboutUs } from 'landing/AboutUs'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
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
