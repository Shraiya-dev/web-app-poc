import { GetStaticProps, NextPage } from 'next'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'
import OrgCreationSuccess from '../../modules/auth/organisationCreation/components/orgCreationSuccess'
import { OnboardingLayout } from '../../sdk'

const OnboardingSuccess: NextPage = () => {
	return (
		<>
			<OnboardingLayout>
				<OrgCreationSuccess />
			</OnboardingLayout>
		</>
	)
}

export default OnboardingSuccess

const pageUrl = '/onboarding/success'
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
