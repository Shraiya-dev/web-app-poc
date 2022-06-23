import { NextPage } from 'next'
import { LoginForm } from '../modules/auth/login/components/LoginForm'
import { OnboardingLayout } from '../sdk'
import Head from 'next/head'
import { useState } from 'react'
import { OTPVerification } from '../modules/auth/otp/components/OtpVerification'
import { OnboardingCard } from '../sdk/layouts/OrganisationCard'

const Login: NextPage = () => {
	const [isOtpSent, setIsOtpSent] = useState(false)
	return (
		<>
			<Head>
				<title>Login | Project Hero</title>
				<meta name='description' content='' />
			</Head>
			<OnboardingLayout>
				<OnboardingCard>
					{isOtpSent ? (
						<OTPVerification isOtpSent={isOtpSent} setIsOtpSent={setIsOtpSent} />
					) : (
						<LoginForm isOtpSent={isOtpSent} setIsOtpSent={setIsOtpSent} />
					)}
				</OnboardingCard>
			</OnboardingLayout>
		</>
	)
}

export default Login
