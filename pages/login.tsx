import { GetStaticProps, NextPage } from 'next'
import { LoginForm } from '../modules/auth/login/components/LoginForm'
import { OnboardingLayout } from '../sdk'
import { useState } from 'react'
import { OTPVerification } from '../modules/auth/otp/components/OtpVerification'
import { OnboardingCard } from '../sdk/layouts/OrganisationCard'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'

const Login: NextPage = () => {
	const [isOtpSent, setIsOtpSent] = useState(false)
	return (
		<>
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

const pageUrl = '/login'
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
