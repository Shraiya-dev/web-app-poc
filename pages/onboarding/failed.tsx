import { NextPage } from 'next'
import { OnboardingLayout } from '../../sdk'
import Head from 'next/head'
import OrgCreationFailed from '../../modules/auth/organisationCreation/components/orgCreationFailed'

const OnboardingFailed: NextPage = () => {
	return (
		<>
			<Head>
				<title>Onboarding Failed | Project Hero</title>
				<meta name='description' content='' />
			</Head>
			<OnboardingLayout>
				<OrgCreationFailed />
			</OnboardingLayout>
		</>
	)
}

export default OnboardingFailed
