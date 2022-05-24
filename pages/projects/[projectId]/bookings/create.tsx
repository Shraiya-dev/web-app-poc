import { Box } from '@mui/material'
import { NextPage } from 'next'
import Head from 'next/head'
import { CreateBooking } from '../../../../modules/createBooking/components/createBooking'

const Create: NextPage = () => {
	return (
		<>
			<Head>
				<title>Project Hero</title>
				<meta name='description' content='' />
			</Head>
			<Box>
				<CreateBooking />
			</Box>
		</>
	)
}

export default Create
