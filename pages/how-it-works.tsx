import { Home, HowItWorks } from 'landing'
import { AboutUs } from 'landing/AboutUs'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { LandingLayout } from 'sdk'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'

const Page: NextPage = () => {
	return (
		<>
			<LandingLayout>
				<HowItWorks />
			</LandingLayout>
		</>
	)
}

export default Page

const pageUrl = '/how-it-works'
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
