import { Plans } from 'landing'
import { NextPage } from 'next'
import Head from 'next/head'
import { LandingLayout } from 'sdk'

const Page: NextPage = () => {
	return (
		<>
			<Head>
				<title>Project Hero | Plans</title>
			</Head>
			<LandingLayout>
				<Plans />
			</LandingLayout>
		</>
	)
}
export default Page
