import { ArrowBack } from '@mui/icons-material'
import { Button, CircularProgress, Grid, Select, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { BookingSummaryCard, getSelectOptionsFromObject, JobCardCard, JobCardState, JobCardStateLabel } from '../../sdk'
import { useBookingId } from './hooks'

export const BookingId = () => {
	const router = useRouter()
	const { jobCards, bookingSummary, isLoading } = useBookingId()
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
					<Stack direction='row' justifyContent='space-between'>
						<Stack direction='row' spacing={2}>
							<Typography variant='h5'>
								{JobCardStateLabel[router.query.jobCardState as JobCardState]}
							</Typography>
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
					</Stack>
				</Grid>
				{isLoading ? (
					<Grid xs={12}>
						<Stack flex={1} alignItems={'center'} p={10}>
							<CircularProgress size={50} />
						</Stack>
					</Grid>
				) : jobCards.length === 0 ? (
					<Grid xs={12}>
						<Stack flex={1} alignItems={'center'} py={25}>
							<Typography variant='h4' color='secondary.light'>
								No Workers in this state
							</Typography>
						</Stack>
					</Grid>
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
