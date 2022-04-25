import { ArrowBack } from '@mui/icons-material'
import { Button, Grid, Select, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { BookingSummaryCard, BOOKING_STATES, getSelectOptionsFromObject, JobCardCard, JOB_TYPES } from '../../sdk'
import { useBookingId } from './hooks'

export const BookingId = () => {
	const router = useRouter()
	const { jobCards } = useBookingId()
	const handelSkillFilter = useCallback((e) => {
		if (e.target.value !== 'none') {
			router.query.skillType = e.target.value
		} else {
			delete router.query.skillType
		}
		router.push(router)
	}, [])

	return (
		<Grid container spacing={2} alignItems='flex-start'>
			<Grid item xs={12}>
				<Button startIcon={<ArrowBack />} onClick={() => router.back()} variant='text' color='primary'>
					Go Back
				</Button>
			</Grid>
			<Grid item xs={12} md={4}>
				<BookingSummaryCard
					booking={{
						bookingId: 'ABCDEF',
						city: 'Noida',
						status: 'ALLOCATION_PENDING' as BOOKING_STATES,

						state: 'Uttar Pradesh',
						jobType: 'BAR_BENDER' as JOB_TYPES,
						peopleRequired: {
							HELPER: 5,
							SUPERVISOR: 2,
						},
						schedule: {
							bookingDuration: '45 to 90 days',
							shiftTime: '9am to 6pm',
							startDate: new Date(),
						},
						jobCardDetails: {
							ACCEPTED: 5,
							READY_TO_DEPLOY: 7,
							DEPLOYMENT_COMPLETE: 10,
						},
					}}
				/>
			</Grid>
			<Grid container item xs={12} md={8} spacing={2}>
				<Grid item xs={12}>
					<Stack direction='row' spacing={2}>
						<Typography variant='h5'>Applied</Typography>
						<Select
							onChange={handelSkillFilter}
							value={router.query.skillType ?? 'none'}
							variant='standard'>
							{getSelectOptionsFromObject({
								none: 'All Skills',
								HELPER: 'Helper',
								TECHNICIAN: 'Technician',
								SUPERVISOR: 'Supervisor',
							})}
						</Select>
					</Stack>
				</Grid>
				{jobCards.length === 0 ? (
					<></>
				) : (
					jobCards.map((jobCard) => (
						<Grid item key={jobCard.workerId} xs={12} md={6}>
							<JobCardCard jobCard={jobCard} />
						</Grid>
					))
				)}
			</Grid>
		</Grid>
	)
}
