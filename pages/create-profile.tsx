import { NextPage } from 'next'
import Head from 'next/head'
import { EmailVerificationForm } from '../modules/auth/emailVerification'

import { OnboardingLayout } from '../sdk'

const CreateProfile: NextPage = () => {
	return (
		<>
			<Head>
				<title>Create Profile | Project Hero</title>
				<meta name='description' content='' />
			</Head>
			<OnboardingLayout>
				<EmailVerificationForm />
			</OnboardingLayout>
		</>
	)
}

export default CreateProfile
