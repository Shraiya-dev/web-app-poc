import { GetStaticProps, NextPage } from 'next'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'
import { OrgCreationForm } from '../modules/auth/organisationCreation'

import { OnboardingLayout } from '../sdk'

const CreateProfile: NextPage = () => {
	return (
		<>
			<OnboardingLayout>
				<OrgCreationForm />
			</OnboardingLayout>
		</>
	)
}

export default CreateProfile

const pageUrl = '/create-organisation'
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
