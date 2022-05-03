import { NextPage } from 'next'
import Head from 'next/head'
import { CreateBooking } from '../../../modules/bookworker/components/createBooking'
import DashboardLayout from '../../../sdk/layouts/DashboardLayout'

const Create: NextPage = () => {
	return (
		<>
			<Head>
				<title>Project Hero</title>
				<meta name='description' content='' />
			</Head>
			<DashboardLayout>
				<CreateBooking />
			</DashboardLayout>
		</>
	)
}

export default Create
