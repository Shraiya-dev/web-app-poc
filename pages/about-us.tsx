import { Home } from 'landing'
import { AboutUs } from 'landing/AboutUs'
import { NextPage } from 'next'
import Head from 'next/head'
import { LandingLayout } from 'sdk'

const Page: NextPage = () => {
	return (
		<>
			<Head>
				<title>Project Hero | About Us</title>
			</Head>
			<LandingLayout>
				<AboutUs />
			</LandingLayout>
		</>
	)
}

export default Page
