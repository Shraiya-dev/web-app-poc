import { NextPage } from 'next'
import Head from 'next/head'
import { EmailVerificationForm } from '../modules/auth/emailVerification'
import { VerifyEmailOtp } from '../modules/auth/emailVerification/components/verifyEmailOtp'

import { OnboardingLayout } from '../sdk'

const VerifyEmail: NextPage = () => {
	return (
		<>
			<Head>
				<title>Verify Email | Project Hero</title>
				<meta name='description' content='' />
			</Head>
			<OnboardingLayout>
				<VerifyEmailOtp />
			</OnboardingLayout>
		</>
	)
}

export default VerifyEmail
