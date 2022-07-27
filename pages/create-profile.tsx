import { GetStaticProps, NextPage } from 'next'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'
import { EmailVerificationForm } from '../modules/auth/emailVerification'

import { OnboardingLayout } from '../sdk'

const CreateProfile: NextPage = () => {
	return (
		<>
			<OnboardingLayout>
				<EmailVerificationForm />
			</OnboardingLayout>
		</>
	)
}

export default CreateProfile

const pageUrl = '/create-profile'
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
