import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { BookingId } from '../../../../../../modules/bookingId'
import ContractorDashboardLayout from '../../../../../../sdk/layouts/ContractorDashboardLayout'

const BookingIdPage: NextPage = () => {
	const router = useRouter()
	return (
		<>
			<Head>
				<title>{router.query.bookingId} | Project Hero </title>
				<meta name='description' content='' />
			</Head>
			<ContractorDashboardLayout>
				<BookingId />
			</ContractorDashboardLayout>
		</>
	)
}
export default BookingIdPage
