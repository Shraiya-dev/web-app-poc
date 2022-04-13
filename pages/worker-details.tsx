import WorkerCard from '../sdk/components/cards/WorkerCards'
import { WorkerBookingInfo } from '../modules/workerBooking/components/workerBookingInfo'
import { Box } from '@mui/system'
export default function workerDetails() {
	return (
		<Box>
			<WorkerBookingInfo />
			<WorkerCard />
		</Box>
	)
}
