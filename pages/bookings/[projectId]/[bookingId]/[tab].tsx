import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'
import { BookingId } from '../../../../modules/bookingId'
import ContractorDashboardLayout from '../../../../sdk/layouts/ContractorDashboardLayout'

const BookingIdPage: NextPage = () => {
	return (
		<>
			<ContractorDashboardLayout>
				<BookingId />
			</ContractorDashboardLayout>
		</>
	)
}
export default BookingIdPage

const pageUrl = '/bookings/[projectId]/[bookingId]/[tab]'
export const getStaticPaths: GetStaticPaths = staticRenderingProvider(pageUrl).getStaticPaths
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
