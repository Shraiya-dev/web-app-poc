import { NextPage } from 'next'

import { OTPVerification } from '../modules/otp/components/OtpVerification'
import { OnboardingLayout } from '../sdk'

const Onboarding: NextPage = () => {
	return (
		<OnboardingLayout>
			<OTPVerification />
		</OnboardingLayout>
	)
}

export default Onboarding
