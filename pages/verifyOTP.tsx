import { NextPage } from 'next'
import Head from 'next/head'

import { OTPVerification } from '../modules/otp/components/OtpVerification'
import { OnboardingLayout } from '../sdk'

const verifyOTP: NextPage = () => {
	return (
		<>
			<Head>
				<title>Login | Project Hero</title>
				<meta name='description' content='' />
			</Head>
			<OnboardingLayout>
				<OTPVerification />
			</OnboardingLayout>
		</>
	)
}

export default verifyOTP
