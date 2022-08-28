import { GetStaticPaths, GetStaticProps } from 'next'
import { useEffect } from 'react'
import { OnboardingLayout, useContractorAuth } from 'sdk'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'
import { CheckoutCard } from 'sdkv2/components/cards/CheckoutCard'

const Checkout = () => {
	const { setBackdropProps } = useContractorAuth()
	useEffect(() => {
		setBackdropProps({ open: false })
	}, [setBackdropProps])
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
