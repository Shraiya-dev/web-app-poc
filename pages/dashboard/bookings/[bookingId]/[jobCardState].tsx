import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { BookingId } from '../../../../modules/bookingId'
import DashboardLayout from '../../../../sdk/layouts/DashboardLayout'

const BookingIdPage: NextPage = () => {
	const router = useRouter()
	return (
		<>
			<Head>
				<title>{router.query.bookingId} | Project Hero </title>
				<meta name='description' content='' />
			</Head>
			<DashboardLayout>
				<BookingId />
			</DashboardLayout>
		</>
	)
}
export default BookingIdPage
