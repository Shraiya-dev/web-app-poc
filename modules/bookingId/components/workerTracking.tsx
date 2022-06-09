import { Badge, Button, CircularProgress, Grid, Pagination, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { JobCardCard, primary, SearchField, theme } from '../../../sdk'

import TuneIcon from '@mui/icons-material/Tune'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useBookingId } from '../hooks'
import Filters from './filters'

const WorkerTracking = () => {
	const router = useRouter()

	const { jobCards, bookingSummary, isLoading, SetPageNumber, pageNumber, hasMore, getJobCards, setJobCards } =
		useBookingId()

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

	useEffect(() => {
		getJobCards(pageNumber)
	}, [getJobCards, router.query.pageNumber])

	return (
		<Stack>
			<Grid container>
				<Grid item xs={12} md={12} justifyContent='space-between' alignItems='center'>
					<Filters filterTags={filterTags} setJobCards={setJobCards} jobCards={jobCards} page={pageNumber} />
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

					{jobCards.length > 0 && (
						<Stack p={4} alignItems='center'>
							<Pagination
								page={router.query.pageNumber ? Number(router.query.pageNumber) : 1}
								hidePrevButton={
									!Number(router.query.pageNumber) || Number(router.query.pageNumber) === 1
								}
								hideNextButton={!hasMore}
								count={hasMore ? 35 : Number(router.query.pageNumber)}
								siblingCount={0}
								disabled={isLoading}
								boundaryCount={0}
								showFirstButton={false}
								showLastButton={false}
								color='primary'
								onChange={(e, page) => {
									router.push(
										{
											query: { ...router.query, pageNumber: `${page}` },
										},
										undefined,
										{}
									)
									let pageNum = page - 1 + ''

									SetPageNumber(`${pageNum}`)
								}}
							/>
						</Stack>
					)}
				</Stack>
			)}
			{/* <FilterDrawer open={openFilterDrawer} onClose={handelDrawerToggle} /> */}

			{/* {hasMore && (
				<Stack
					sx={{
						marginTop: 3,
						marginBottom: 3,
						justifyContent: 'center',
						display: 'flex',
						alignItems: 'center',
					}}
					direction='row'>
					<Button
						variant='text'
						onClick={() => {
							SetPageNumber((state) => state + 1)
							router.query.pageNumber = `${pageNumber + 1}`
							router.replace(router)
						}}>
						See More
					</Button>
				</Stack>
			)} */}
		</Stack>
	)
}

export default WorkerTracking
