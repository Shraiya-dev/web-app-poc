import { Box } from '@mui/material'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'
import { CreateBooking } from '../../../../modules/createBooking/components/createBooking'

const Create: NextPage = () => {
	return (
		<>
			<Box>
				<CreateBooking />
			</Box>
		</>
	)
}

export default Create

const pageUrl = '/projects/[projectId]/bookings/create'
export const getStaticPaths: GetStaticPaths = staticRenderingProvider(pageUrl).getStaticPaths
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
