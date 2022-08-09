import { CircularProgress, Grid, Pagination, Stack, Typography } from '@mui/material'
import { BottomLayout, JobCardCard, primary, useMobile } from '../../../sdk'

import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useBookingId } from '../hooks'
import Filters from './filters'

interface handleLength {
	handleRequiredTotal: (jobCardsLength: any) => void
}

const WorkerTracking = ({ handleRequiredTotal }: handleLength) => {
	const router = useRouter()
	const isMobile = useMobile()

	const {
		jobCardsLength,
		jobCards,
		bookingSummary,
		isLoading,
		SetPageNumber,
		pageNumber,
		hasMore,
		getJobCards,
		setJobCards,
		form,
	} = useBookingId()

	const { helperCount, technicianCount, supervisorCount, totalCount } = useMemo(() => {
		const helper = bookingSummary?.stats?.jobCardCountsBySkill.HELPER ?? 0
		const technician = bookingSummary?.stats?.jobCardCountsBySkill.TECHNICIAN ?? 0
		const supervisor = bookingSummary?.stats?.jobCardCountsBySkill.SUPERVISOR ?? 0
		const total = helper + technician + supervisor
		return {
			helperCount: helper,
			technicianCount: technician,
			supervisorCount: supervisor,
			totalCount: total,
		}
	}, [bookingSummary])

	handleRequiredTotal(totalCount ?? 0)

	const filterTags = [
		// {
		// 	label: `Applied(${
		// 		(bookingSummary?.stats?.jobCardCounts?.WORKER_APPLIED ?? 0) +
		// 		(bookingSummary?.stats?.jobCardCounts?.ACCEPTED ?? 0)
		// 	})`,
		// 	value: 'WORKER_APPLIED',
		// },
		// {
		// 	label: `Ready To Deploy(${bookingSummary?.stats?.jobCardCounts?.READY_TO_DEPLOY ?? 0})`,
		// 	value: 'READY_TO_DEPLOY',
		// },
		// {
		// 	label: `Deployed(${
		// 		(bookingSummary?.stats?.jobCardCounts?.DEPLOYMENT_COMPLETE ?? 0) +
		// 		(bookingSummary?.stats?.jobCardCounts?.COMPLETED ?? 0)
		// 	})`,
		// 	value: 'DEPLOYMENT_COMPLETE',
		// },
		{ label: `Supervisor`, value: 'SUPERVISOR' },
		{ label: `Helper`, value: 'HELPER' },
		{ label: `Technician`, value: 'TECHNICIAN' },
	]

	useEffect(() => {
		router.push(
			{
				query: { ...router.query, pageNumber: `1` },
			},
			undefined,
			{}
		)
	}, [form.values.skillType, form.values.jobCardState])

	useEffect(() => {
		let pageNumber = `${Number(router.query.pageNumber) > 0 ? Number(router.query.pageNumber) - 1 : '0'}`
		getJobCards(pageNumber)
	}, [getJobCards, router.query.pageNumber])

	return (
		<>
			<Stack>
				<Grid container>
					<Grid item xs={12} md={12} justifyContent='space-between' alignItems='center'>
						<Filters
							filterTags={filterTags}
							setJobCards={setJobCards}
							jobCards={jobCards}
							page={pageNumber}
							form={form}
						/>
					</Grid>
					{/* <Grid item xs={12} md={3} alignItems='center'>
					<SearchField name='name' fullWidth placeholder='Search a worker' size='small' />
				</Grid> */}
				</Grid>

				<Stack>
					{isLoading ? (
						<Stack p={5} alignItems='center'>
							<CircularProgress size={50} />
						</Stack>
					) : (
						<Stack mt={4}>
							{jobCards.length === 0 ? (
								<Stack flex={1} mt={20} direction={'column'} alignItems='center'>
									<Typography
										fontFamily={'Saira,sans-serif'}
										fontWeight={700}
										variant='h4'
										color={primary.yellow}>
										We have made your booking live on our Hero App
									</Typography>
									<Typography
										fontFamily={'Saira,sans-serif'}
										fontWeight={700}
										variant='h4'
										color={primary.yellow}>
										You will see the application as soon as any Hero applies!
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
				</Stack>
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
				{isMobile && (
					<Stack direction={'row'} justifyContent={'center'}>
						<BottomLayout />
					</Stack>
				)}
			</Stack>
		</>
	)
}

export default WorkerTracking
