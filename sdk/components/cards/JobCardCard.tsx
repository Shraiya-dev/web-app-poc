import { Avatar, CircularProgress, Icon, Paper, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import { Dropdown } from 'sdkv2/components'
import ExperienceIcon from '../../../public/assets/icons/experience.svg'
import LocationIcon from '../../../public/assets/icons/location.svg'
import WorkerIcon from '../../../public/assets/icons/workerIcon.svg'
import { primary, WorkerApplicationStatusLabel, WorkerTypeLabel } from '../../constants'
import { JobCard, WORKER_APPLICATION_STATUS } from '../../types'
import { LinkButton } from '../button'
import { ConfirmationDialog } from '../dialogs'

interface JobCardCardProps {
	jobCard: JobCard
	updateJobCard: (value: WORKER_APPLICATION_STATUS, jobCard: JobCard) => Promise<any>
}

const ApplicationStatusColorMap: { [key in WORKER_APPLICATION_STATUS]: string } = {
	[WORKER_APPLICATION_STATUS.COULD_NOT_CONNECT]: '#F69E5433',
	[WORKER_APPLICATION_STATUS.WORK_STARTED]: '#EFC41A4D',
	[WORKER_APPLICATION_STATUS.HIRED]: '#0FAF7F33',
	[WORKER_APPLICATION_STATUS.REJECTED]: '#EA5A4D33',
	[WORKER_APPLICATION_STATUS.INCORRECT_PROFILE]: '#EA5A4D33',
	[WORKER_APPLICATION_STATUS.IN_PROGRESS]: '#F69E5433',
}
const ApplicationStatusOptions: { label: string; value: WORKER_APPLICATION_STATUS }[] = [
	{
		label: WorkerApplicationStatusLabel[WORKER_APPLICATION_STATUS.COULD_NOT_CONNECT],
		value: WORKER_APPLICATION_STATUS.COULD_NOT_CONNECT,
	},
	{
		label: WorkerApplicationStatusLabel[WORKER_APPLICATION_STATUS.WORK_STARTED],
		value: WORKER_APPLICATION_STATUS.WORK_STARTED,
	},
	{
		label: WorkerApplicationStatusLabel[WORKER_APPLICATION_STATUS.HIRED],
		value: WORKER_APPLICATION_STATUS.HIRED,
	},
	{
		label: WorkerApplicationStatusLabel[WORKER_APPLICATION_STATUS.REJECTED],
		value: WORKER_APPLICATION_STATUS.REJECTED,
	},
	{
		label: WorkerApplicationStatusLabel[WORKER_APPLICATION_STATUS.INCORRECT_PROFILE],
		value: WORKER_APPLICATION_STATUS.INCORRECT_PROFILE,
	},
	{
		label: WorkerApplicationStatusLabel[WORKER_APPLICATION_STATUS.IN_PROGRESS],
		value: WORKER_APPLICATION_STATUS.IN_PROGRESS,
	},
]

export const JobCardCard = ({ jobCard, updateJobCard }: JobCardCardProps) => {
	const [ConfirmationDialogProps, setConfirmationDialogProps] = useState({
		title: 'Incorrect Profile?',
		caption: 'We will replace this card with another suitable worker',
		open: false,
		confirm: () => {},
	})

	return (
		<>
			<Paper elevation={1} sx={{ flex: 1, borderRadius: 2 }}>
				<Stack spacing={2} alignItems='center' p={2}>
					<Stack
						flex={1}
						width='100%'
						direction={{ xs: 'row', md: 'column' }}
						spacing={2}
						alignItems='center'
						height='100%'>
						<Stack>
							<Avatar
								sx={{ width: { xs: 100, md: 150 }, height: { xs: 100, md: 150 } }}
								src={
									jobCard?.workerImage?.length > 0
										? jobCard?.workerImage
										: '/assets/icons/workerIcon.svg'
								}
							/>
						</Stack>
						<Stack
							direction={'column'}
							spacing={1}
							flex={1}
							alignItems={{ xs: 'flex-start', md: 'center' }}>
							<Typography
								mb={1}
								variant='h5'
								fontFamily={'Saira,sans-serif'}
								fontWeight={700}
								textOverflow='ellipsis'
								whiteSpace='nowrap'
								overflow='hidden'
								color={primary.properDark}>
								{jobCard.WorkerName ?? 'No Name'}
							</Typography>
							{false ? (
								<CircularProgress size={20} />
							) : (
								<Dropdown
									variant='filled'
									value={jobCard.contractorFeedbackCode ?? 'none'}
									options={ApplicationStatusOptions}
									disableUnderline
									onChange={(e) => {
										const value = e.target.value as WORKER_APPLICATION_STATUS
										if (value === WORKER_APPLICATION_STATUS.INCORRECT_PROFILE) {
											setConfirmationDialogProps((p) => ({
												...p,
												open: true,
												confirm: () => updateJobCard(value, jobCard),
											}))
										} else {
											updateJobCard(value, jobCard)
										}
									}}
									sx={{
										backgroundColor: jobCard.contractorFeedbackCode
											? ApplicationStatusColorMap[
													jobCard.contractorFeedbackCode ??
														WORKER_APPLICATION_STATUS.COULD_NOT_CONNECT
											  ]
											: '#0000000D',
										borderRadius: 30,
										'>div': {
											color: '#000000',

											px: 2,
											py: 1,
										},
										'&:hover': {
											backgroundColor: jobCard.contractorFeedbackCode
												? ApplicationStatusColorMap[
														jobCard.contractorFeedbackCode ??
															WORKER_APPLICATION_STATUS.COULD_NOT_CONNECT
												  ]
												: '#0000000D',
										},
										'&.Mui-focused': {
											backgroundColor: jobCard.contractorFeedbackCode
												? ApplicationStatusColorMap[
														jobCard.contractorFeedbackCode ??
															WORKER_APPLICATION_STATUS.COULD_NOT_CONNECT
												  ]
												: '#0000000D',
										},
									}}
									emptyState={{ label: 'Select Status', value: 'none' }}
								/>
							)}
							<Typography
								fontFamily={'Karla,sans-serif'}
								fontWeight={500}
								className='vAlignCenter'
								variant='body2'
								color={primary.properDark}>
								{/* <EngineeringIcon fontSize='inherit' /> */}
								<Icon fontSize='inherit' style={{ display: 'flex' }}>
									<Image src={WorkerIcon} />
								</Icon>
								&nbsp;{WorkerTypeLabel[jobCard.skillType]}
							</Typography>
							<Typography
								fontFamily={'Karla,sans-serif'}
								fontWeight={500}
								className='vAlignCenter'
								variant='body2'
								color={primary.properDark}>
								{/* <LocationOn fontSize='inherit' /> */}
								<Icon fontSize='inherit' style={{ display: 'flex' }}>
									<Image src={LocationIcon} />
								</Icon>
								&nbsp;{jobCard.city}, {jobCard.state}
							</Typography>
							<Typography
								fontFamily={'Karla,sans-serif'}
								fontWeight={500}
								className='vAlignCenter'
								variant='body2'
								color={primary.properDark}>
								{/* <EqualizerRounded fontSize='inherit' /> */}
								<Icon fontSize='inherit' style={{ display: 'flex' }}>
									<Image src={ExperienceIcon} />
								</Icon>
								&nbsp;{jobCard.experience} Years
								{/* Years Of Experience */}
							</Typography>
						</Stack>
					</Stack>
					{jobCard.phoneNumber && (
						<LinkButton
							sx={{ px: 5, py: 0.7 }}
							startIcon={<img src='/assets/icons/buttonCall.svg' />}
							href={`tel:${jobCard.phoneNumber}`}
							onClick={() => {}}>
							Call {jobCard.phoneNumber ?? ' 	'}
						</LinkButton>
					)}
				</Stack>
			</Paper>
			<ConfirmationDialog
				confirmationLabel='Confirm'
				{...ConfirmationDialogProps}
				cancel={() => setConfirmationDialogProps((p) => ({ ...p, open: false }))}
			/>
		</>
	)
}
