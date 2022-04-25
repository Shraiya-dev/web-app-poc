import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { BookingId } from '../../../../modules/bookingId'
import DashboardLayout from '../../../../sdk/layouts/DashboardLayout'

const BookingIdPage: NextPage = () => {
	const router = useRouter()
	return (
		<DashboardLayout>
			<BookingId />
		</DashboardLayout>
	)
}
export default BookingIdPage
