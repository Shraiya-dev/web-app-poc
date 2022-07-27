import { Typography } from '@mui/material'
import { GetStaticProps, NextPage } from 'next'
import { LandingLayout, Section } from 'sdk'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'

const ContactUs: NextPage = () => {
	return (
		<>
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

const pageUrl = '/contact-us'
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
