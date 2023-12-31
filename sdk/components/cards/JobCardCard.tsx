import { Avatar, CircularProgress, Icon, Paper, Stack, Typography } from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import { sendAnalytics } from 'sdk/analytics'
import { Dropdown } from 'sdkv2/components'
import ExperienceIcon from '../../../public/assets/icons/experience.svg'
import LocationIcon from '../../../public/assets/icons/location.svg'
import WorkerIcon from '../../../public/assets/icons/workerIcon.svg'
import { WorkerApplicationStatusLabel, WorkerTypeLabel, primary } from '../../constants'
import { JobCard, WORKER_APPLICATION_STATUS } from '../../types'
import { LinkButton } from '../button'
import { ConfirmationDialog } from '../dialogs'

interface JobCardCardProps {
	jobCard: JobCard
	updateJobCard: (value: WORKER_APPLICATION_STATUS, jobCard: JobCard) => Promise<any>
}

const ApplicationStatusColorMap: { [key in WORKER_APPLICATION_STATUS]: string } = {
	[WORKER_APPLICATION_STATUS.SHORTLISTED]: '#F69E5433',
	[WORKER_APPLICATION_STATUS.TO_REVIEW]: '#EFC41A4D',
	[WORKER_APPLICATION_STATUS.HIRED]: '#0FAF7F33',
	[WORKER_APPLICATION_STATUS.REJECTED]: '#EA5A4D33',
}
const ApplicationStatusOptions: { label: string; value: WORKER_APPLICATION_STATUS }[] = [
	{
		label: WorkerApplicationStatusLabel[WORKER_APPLICATION_STATUS.SHORTLISTED],
		value: WORKER_APPLICATION_STATUS.SHORTLISTED,
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
		label: WorkerApplicationStatusLabel[WORKER_APPLICATION_STATUS.TO_REVIEW],
		value: WORKER_APPLICATION_STATUS.TO_REVIEW,
	},
]

export enum TriggerCallType {
	CHAT_ON_WHATSAPP = 'CHAT_ON_WHATSAPP',
	PHONE_CALL = 'PHONE_CALL',
}
export const interactWithWorker = async ({
	jobCardId,
	triggerCallType,
}: {
	jobCardId: string
	triggerCallType: string
}) => {
	const payload = {
		triggerCallType,
	}
	return axios.post(`/gateway/customer-api/job-card/${jobCardId}/trigger-call`, payload)
}

export const JobCardCard = ({ jobCard, updateJobCard }: JobCardCardProps) => {
	const [ConfirmationDialogProps, setConfirmationDialogProps] = useState({
		title: 'Rejection Confirmation',
		caption:
			'Aap reject karna chahte hai? Aap ye aage jaake waapsa badal nahi paayenge aur na hi kabhi iss worker se contact kar paayenge.',
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
						<Stack alignSelf={{ xs: 'flex-start', md: 'center' }}>
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
									MenuProps={{
										PaperProps: {
											sx: {
												background: '#ffffff',
												color: '#000000 ',
												ul: {
													backgroundColor: '#ffffff',
													li: {
														color: '#000',
													},
												},
											},
										},
									}}
									disableUnderline
									onChange={(e) => {
										const value = e.target.value as WORKER_APPLICATION_STATUS
										sendAnalytics({
											name: 'heroApplicationsStatus',
											action: 'DropDownClick',
											metaData: {
												status: value,
												jobCard,
											},
										})
										if (value === WORKER_APPLICATION_STATUS.REJECTED) {
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
										backgroundColor: '#0000000D',
										borderRadius: 30,
										'>div': {
											color: '#000000',

											px: 2,
											py: 1,
										},
										'&:hover': {
											backgroundColor: '#0000000D',
										},
										'&.Mui-focused': {
											backgroundColor: '#0000000D',
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
							onClick={() => {
								sendAnalytics({
									action: 'ButtonClick',
									name: 'contactWorker',
									metaData: {
										phoneNumber: jobCard?.phoneNumber,
									},
								})
								interactWithWorker({
									jobCardId: jobCard?.jobCardId,
									triggerCallType: TriggerCallType.PHONE_CALL,
								})
							}}>
							Call {jobCard?.phoneNumber ?? ' 	'}
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
