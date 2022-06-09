import { NextPage } from 'next'
import Head from 'next/head'
import { OrgCreationForm } from '../modules/auth/organisationCreation'

import { OnboardingLayout } from '../sdk'

const CreateProfile: NextPage = () => {
	return (
		<>
			<Head>
				<title>Organisation Creation | Project Hero</title>
				<meta name='description' content='' />
			</Head>
			<OnboardingLayout>
				<OrgCreationForm />
			</OnboardingLayout>
		</>
	)
}

export default CreateProfile
