import WorkerCard from '../sdk/components/cards/WorkerCards'
import { WorkerBookingInfo } from '../modules/workerBooking/components/workerBookingInfo'
import { Grid, Box, Stack, Container } from '@mui/material'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import DashboardLayout from '../sdk/layouts/DashboardLayout'
import { useWorkerBookingInfo } from '../modules/workerBooking/hooks/useWorkerBookinInfo'
import { BookingCard } from '../sdk'
const workerDetails: NextPage = () => {
	const router = useRouter()
	const { workersData } = useWorkerBookingInfo()

	const handleView = () => {
		router.push('/workerprofile')
	}
	return (
		<DashboardLayout>
			<Grid container alignItems={"flex-start"}>
				<Grid item xs={12} md={4}>
					<BookingCard />
				</Grid>

				<Grid item container xs={12} md={8}>
					{workersData.map((booking, index) => {
						return (
							<Grid item xs={12} md={6} key={index}>
								<WorkerCard handleView={handleView} />
							</Grid>
						)
					})}
				</Grid>
			</Grid>
		</DashboardLayout>
	)
}

export default workerDetails
