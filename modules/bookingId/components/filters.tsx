import { Chip, Grid, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { JobCardState, primary, theme, useMobile, WORKER_TYPES } from '../../../sdk'
import { useBookingId } from '../hooks'

const Filters = ({ ...props }) => {
	const { filterTags, setJobCards, jobCards, page, form } = props

	//const { form } = useFilters()
	const { getJobCards } = useBookingId()
	const router = useRouter()
	const isMobile = useMobile()

	useEffect(() => {
		if (form.values.skillType.length > 0) {
			if (form.values.skillType.length === 1) {
				router.query.skillType = form.values.skillType[0]
			} else {
				router.query.skillType = form.values.skillType.join(',')
			}
		} else {
			delete router.query.skillType
		}

		if (form.values.jobCardState.length > 0) {
			if (form.values.jobCardState.length === 1) {
				router.query.jobCardState = form.values.jobCardState[0]
			} else {
				router.query.jobCardState = form.values.jobCardState.join(',')
			}
		} else {
			delete router.query.jobCardState
		}
		router.query = {
			projectId: router.query.projectId,
			bookingId: router.query.bookingId,
			...router.query,
		}

		router.replace(router, undefined, {
			shallow: true,
			scroll: true,
		})

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.values.skillType, form.values.jobCardState])

	return (
		<Grid item xs={12} md={12}>
			<Stack direction='row' pb={1} overflow={'auto'}>
				{filterTags?.map((item: any) => {
					return (
						<Chip
							variant='outlined'
							style={{
								color: form.values.tags.includes(item.value)
									? primary.yellow
									: theme.palette.secondary.main,

								borderColor: form.values.tags.includes(item.value)
									? primary.yellow
									: primary.secButtonColor,
								borderRadius: 8,
								fontSize: 14,
							}}
							sx={{
								mr: 1,
								mb: 1,
							}}
							key={item.value}
							label={item.label}
							clickable
							onClick={
								!form.values.tags.includes(item.value)
									? () => {
											form.setFieldValue('tags', [...form.values.tags, item.value])
											if (item.value in WORKER_TYPES) {
												form.setFieldValue('skillType', [...form.values.skillType, item.value])
											} else if (item.value in JobCardState) {
												if (item.value === 'WORKER_APPLIED') {
													form.setFieldValue('jobCardState', [
														...form.values.jobCardState,
														item.value,
														'ACCEPTED',
													])
												} else if (item.value === 'DEPLOYMENT_COMPLETE') {
													form.setFieldValue('jobCardState', [
														...form.values.jobCardState,
														item.value,
														'COMPLETED',
													])
												} else {
													form.setFieldValue('jobCardState', [
														...form.values.jobCardState,
														item.value,
													])
												}
											}
									  }
									: undefined
							}
							onDelete={
								form.values.tags.includes(item.value)
									? () => {
											form.setFieldValue('tags', [
												...form.values.tags.filter((val: any) => val !== item.value),
											])

											if (item.value in WORKER_TYPES) {
												form.setFieldValue('skillType', [
													...form.values.skillType.filter((val: any) => val !== item.value),
												])
											} else if (item.value in JobCardState) {
												if (item.value === 'WORKER_APPLIED') {
													form.setFieldValue('jobCardState', [
														...form.values.jobCardState.filter(
															(val: any) => val !== item.value && val !== 'ACCEPTED'
														),
													])
												} else if (item.value === 'DEPLOYMENT_COMPLETE') {
													form.setFieldValue('jobCardState', [
														...form.values.jobCardState.filter(
															(val: any) => val !== item.value && val !== 'COMPLETED'
														),
													])
												} else {
													form.setFieldValue('jobCardState', [
														...form.values.jobCardState.filter(
															(val: any) => val !== item.value
														),
													])
												}
											}

											getJobCards(page)
									  }
									: undefined
							}
						/>
					)
				})}
			</Stack>
		</Grid>
	)
}

export default Filters
