import { Stack, Typography } from '@mui/material'
import { Home } from 'landing'
import { NextPage } from 'next'
import Head from 'next/head'
import { LandingLayout, Section } from 'sdk'

const ContactUs: NextPage = () => {
	return (
		<>
			<Head>
				<title>Project Hero | Contact Us</title>
			</Head>
			<LandingLayout>
				<Section sx={{ py: '15vh' }}>
					<Typography variant='h3' fontWeight={700}>
						Contact Details
					</Typography>
					<Typography variant='h6'>
						<strong>Address : </strong> 837/1 7th Main, 2nd Cross, Indiranagar 2nd Stage, Bangalore - 560038
					</Typography>
					<Typography variant='h6'>
						<strong>Contact Number : </strong> <a href='tel:+918035097085'>+91 8035097085</a>
					</Typography>
					<Typography variant='h6'>
						<strong>Email : </strong> <a href='mailto:help@projecthero.in'>help@projecthero.in</a>
					</Typography>
				</Section>
			</LandingLayout>
		</>
	)
}

export default ContactUs
