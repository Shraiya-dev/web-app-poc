import { FAQ } from 'landing'
import { NextPage } from 'next'
import Head from 'next/head'
import { LandingLayout } from 'sdk'

const Page: NextPage = () => {
	return (
		<>
			<Head>
				<title>Project hero | FAQ</title>
			</Head>
			<LandingLayout>
				<FAQ />
			</LandingLayout>
		</>
	)
}
export default Page
