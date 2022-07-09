import { Home } from 'landing'
import { NextPage } from 'next'
import Head from 'next/head'
import { LandingLayout } from 'sdk'

const HomePage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Project Hero | Home</title>
			</Head>
			<LandingLayout>
				<Home />
			</LandingLayout>
		</>
	)
}

export default HomePage
