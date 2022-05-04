import { NextPage } from 'next'
import Head from 'next/head'
import { OnboardingLayout } from '../sdk'

//*this is a test page to test out components for theming
const Index: NextPage = () => {
	return (
		<>
			<Head>
				<title>Project Hero</title>
				<meta name='description' content='' />
			</Head>
			<OnboardingLayout></OnboardingLayout>
		</>
	)
}

export default Index
