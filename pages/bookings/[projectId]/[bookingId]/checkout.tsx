import { GetStaticPaths, GetStaticProps } from 'next'
import { OnboardingLayout } from 'sdk'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'
import { CheckoutCard } from 'sdkv2/components/cards/CheckoutCard'

const Checkout = () => {
	return (
		<>
			<OnboardingLayout helmet={false}>
				<CheckoutCard />
			</OnboardingLayout>
		</>
	)
}

export default Checkout

const pageUrl = '/bookings/[projectId]/[bookingId]/checkout'
export const getStaticPaths: GetStaticPaths = staticRenderingProvider(pageUrl).getStaticPaths
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
