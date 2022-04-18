import WorkerCard from '../sdk/components/cards/WorkerCards'
import { WorkerBookingInfo } from '../modules/workerBooking/components/workerBookingInfo'
import { Box } from '@mui/system'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const workerDetails: NextPage = () => {
	const router = useRouter();

	const handleView = ()=>{

		router.push('/workerprofile')

	}
	return (
		<Box>
			<WorkerBookingInfo />
			<WorkerCard handleView={handleView}/>
		</Box>
	)
}

export default workerDetails
