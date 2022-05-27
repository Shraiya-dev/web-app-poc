import { Box } from '@mui/material'
import { NextPage } from 'next'
import Head from 'next/head'
import { CreateBooking } from '../../../../modules/createBooking/components/createBooking'

const Create: NextPage = () => {
	return (
		<>
			<Head>
				<title>Create Booking | Project Hero</title>
				<meta name='Create Booking' content='' />
			</Head>
			<Box>
				<CreateBooking />
			</Box>
		</>
	)
}

export default Create
