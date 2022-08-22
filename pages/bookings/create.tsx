import { Box } from '@mui/material'
import { CreateBooking } from 'modules/createBooking/components/createBooking'
import { EasyBooking } from 'modules/createBooking/components/easyBooking'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'

const EasyCreateBooking: NextPage = () => {
	return (
		<>
			<Box>
				{/* <CreateBooking /> */}

				<EasyBooking />
			</Box>
		</>
	)
}

export default EasyCreateBooking

const pageUrl = '/bookings/create'
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
