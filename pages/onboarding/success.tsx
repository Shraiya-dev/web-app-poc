import { NextPage } from 'next'
import { OnboardingLayout } from '../../sdk'
import Head from 'next/head'
import OrgCreationSuccess from '../../modules/auth/organisationCreation/components/orgCreationSuccess'

const OnboardingSuccess: NextPage = () => {
	return (
		<>
			<Head>
				<title>Onboarding Success | Project Hero</title>
				<meta name='description' content='' />
			</Head>
			<OnboardingLayout>
				<OrgCreationSuccess />
			</OnboardingLayout>
		</>
	)
}

export default OnboardingSuccess
