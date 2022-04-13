import { NextPage } from 'next'

import { BasicDetailsForm } from '../modules/onboarding/components/BasicDetailsForm'
import { OnboardingLayout } from '../sdk'

const Onboarding: NextPage = () => {
	return (
		<OnboardingLayout>
			<BasicDetailsForm />
		</OnboardingLayout>
	)
}

export default Onboarding
