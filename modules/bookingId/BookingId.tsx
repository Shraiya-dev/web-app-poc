import { ArrowBack } from '@mui/icons-material'
import { Button, Grid, Select, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { BookingSummaryCard, getSelectOptionsFromObject, JobCardCard } from '../../sdk'
import { useBookingId } from './hooks'

export const BookingId = () => {
	const router = useRouter()
	const { jobCards, bookingSummary } = useBookingId()
	const handelSkillFilter = useCallback(
		(e) => {
			if (e.target.value !== 'none') {
				router.query.skillType = e.target.value
			} else {
				delete router.query.skillType
			}
			router.replace(router)
		},
		[router]
	)

	return (
		<Grid container spacing={2} alignItems='flex-start'>
			<Grid item xs={12}>
				<Button startIcon={<ArrowBack />} onClick={() => router.back()} variant='text' color='primary'>
					Go Back
				</Button>
			</Grid>
			<Grid item xs={12} md={4}>
				{bookingSummary && <BookingSummaryCard booking={bookingSummary} />}
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
