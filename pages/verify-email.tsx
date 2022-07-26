import { GetStaticProps, NextPage } from 'next'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'
import { VerifyEmailOtp } from '../modules/auth/emailVerification/components/verifyEmailOtp'
import { OnboardingLayout } from '../sdk'

const VerifyEmail: NextPage = () => {
	return (
		<>
			<OnboardingLayout>
				<VerifyEmailOtp />
			</OnboardingLayout>
		</>
	)
}

export default VerifyEmail

const pageUrl = '/verify-email'
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
