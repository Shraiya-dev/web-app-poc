import { GetStaticProps, NextPage } from 'next'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'
import OrgCreationFailed from '../../modules/auth/organisationCreation/components/orgCreationFailed'
import { OnboardingLayout } from '../../sdk'

const OnboardingFailed: NextPage = () => {
	return (
		<>
			<OnboardingLayout>
				<OrgCreationFailed />
			</OnboardingLayout>
		</>
	)
}

export default OnboardingFailed

const pageUrl = '/onboarding/failed'
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
