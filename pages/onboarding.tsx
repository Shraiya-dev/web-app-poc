import { NextPage } from 'next'
import Head from 'next/head'

import { BasicDetailsForm } from '../modules/onboarding/components/BasicDetailsForm'
import { OnboardingLayout } from '../sdk'

const Onboarding: NextPage = () => {
	return (
		<>
			<Head>
				<title>Onboarding | Project Hero</title>
				<meta name='description' content='' />
			</Head>
			<OnboardingLayout>
				<BasicDetailsForm />
			</OnboardingLayout>
		</>
	)
}

export default Onboarding
