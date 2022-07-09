import { Home } from 'landing'
import { NextPage } from 'next'
import Head from 'next/head'
import { LandingLayout } from 'sdk'

const AboutUs: NextPage = () => {
	return (
		<>
			<Head>
				<title>Project Hero | About Us</title>
			</Head>
			<LandingLayout></LandingLayout>
		</>
	)
}

export default AboutUs
