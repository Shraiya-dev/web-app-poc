import { Badge, Button, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { JobCardCard, primary, SearchField, theme } from '../../../sdk'

import TuneIcon from '@mui/icons-material/Tune'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { useBookingId } from '../hooks'
import Filters from './filters'

const WorkerTracking = () => {
	const router = useRouter()

	const { jobCards, bookingSummary, isLoading } = useBookingId()

	const filterTags = [
		{
			label: `Applied(${
				(bookingSummary?.stats?.jobCardCounts?.WORKER_APPLIED ?? 0) +
				(bookingSummary?.stats?.jobCardCounts?.ACCEPTED ?? 0)
			})`,
			value: 'WORKER_APPLIED',
		},
		{
			label: `Ready To Deploy(${bookingSummary?.stats?.jobCardCounts?.READY_TO_DEPLOY ?? 0})`,
			value: 'READY_TO_DEPLOY',
		},
		{
			label: `Deployed(${
				(bookingSummary?.stats?.jobCardCounts?.DEPLOYMENT_COMPLETE ?? 0) +
				(bookingSummary?.stats?.jobCardCounts?.COMPLETED ?? 0)
			})`,
			value: 'DEPLOYMENT_COMPLETE',
		},
		{ label: `Supervisor`, value: 'SUPERVISOR' },
		{ label: `Helper`, value: 'HELPER' },
		{ label: `Technician`, value: 'TECHNICIAN' },
	]

	return (
		<Stack>
			<Grid container>
				<Grid item xs={12} md={9} justifyContent='space-between' alignItems='center'>
					<Filters filterTags={filterTags} />
				</Grid>
				{/* <Grid item xs={12} md={3} alignItems='center'>
					<SearchField name='name' fullWidth placeholder='Search a worker' size='small' />
				</Grid> */}
			</Grid>

			{isLoading ? (
				<Stack p={5} alignItems='center'>
					<CircularProgress size={50} />
				</Stack>
			) : (
				<Stack mt={4}>
					{jobCards.length === 0 ? (
						<Stack flex={1} mt={20} direction={'column'} alignItems='center'>
							<Typography variant='h4' color={theme.palette.secondary.light}>
								You can see workers here when allocation starts
							</Typography>
						</Stack>
					) : (
						<Grid container spacing={3}>
							{jobCards.map((jobCardInfo, index) => {
								return (
									<Grid item xs={12} md={4} key={index}>
										<JobCardCard jobCard={jobCardInfo} />
									</Grid>
								)
							})}
						</Grid>
					)}
					{/* TODO: Look into pagination */}
					{/* {bookings.totalBookings > 0 && (
						<Stack p={4} alignItems='center'>
							<Pagination
								color='primary'
								page={Number(router.query.pageNumber ?? 0) + 1}
								onChange={(_e, page) => {
									router.query.pageNumber = page - 1 + ''
									router.push(router)
								}}
								count={Math.ceil(bookings.totalBookings / 10)}
							/>
						</Stack>
					)} */}
				</Stack>
			)}
			{/* <FilterDrawer open={openFilterDrawer} onClose={handelDrawerToggle} /> */}
		</Stack>
	)
}

export default WorkerTracking
