import { Engineering, EqualizerRounded, LocationOn } from '@mui/icons-material'
import { Box, Button, Card, Chip, Icon, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { JobCardStateLabel, primary } from '../../constants'
import { JobCard, JobCardState } from '../../types'
import { JobCardStatusChip } from '../chips/jobCardStatusChip'
import EngineeringIcon from '@mui/icons-material/Engineering'
import { WorkerTypeLabel } from '../../constants/workerType'
import WorkerType from '../../../public/assets/icons/workerType.svg'
import LocationIcon from '../../../public/assets/icons/location.svg'
import ExperienceIcon from '../../../public/assets/icons/experience.svg'
import WorkerIcon from '../../../public/assets/icons/workerIcon.svg'

const CustomPaper = styled(Paper)(({ theme }) => ({
	overflow: 'hidden',
	flex: 1,
	padding: '14px 0 16px 0',
	'.profileImage': {
		width: 125,
		backgroundPosition: 'center',
		backgroundFit: 'cover',
		backgroundRepeat: 'no-repeat',
	},

	'.vAlignCenter': {
		display: 'flex',
		alignItems: 'center',
		fontSize: '14px',
		fontWeight: '500',
	},
}))
interface JobCardCardProps {
	jobCard: JobCard
}

export const JobCardCard = ({ jobCard }: JobCardCardProps) => {
	return (
		<CustomPaper elevation={1}>
			<Stack flex={1} direction='column' alignItems='center' height='100%'>
				<Stack
					position='relative'
					sx={{ height: '33%', width: '33%', borderRadius: '50%', overflow: 'hidden' }}
				>
					<img
						width={'100%'}
						height={'100%'}
						src={jobCard?.workerImage?.length > 0 ? jobCard?.workerImage : '/assets/icons/workerIcon.svg'}
					/>
				</Stack>
				<Stack direction={'column'} flex={1} maxWidth='calc(100% - 33%)' p={2} alignItems='center'>
					<Stack mb={1} direction='row' justifyContent='center'>
						<Typography
							variant='h6'
							fontWeight={600}
							textOverflow='ellipsis'
							whiteSpace='nowrap'
							overflow='hidden'
							color={primary.properDark}
						>
							{jobCard.WorkerName ?? 'No Name'}
						</Typography>

						{/* <JobCardStatusChip jobCardState={jobCard.jobCardState} sx={{ verticalAlign: 'middle' }} /> */}
					</Stack>
					<Stack direction={'column'} flex={1} mb={'40px'} spacing={1} alignItems={'center'}>
						<Typography className='vAlignCenter' variant='body2' color={primary.properDark}>
							{/* <EngineeringIcon fontSize='inherit' /> */}
							<Icon fontSize='inherit' style={{ display: 'flex' }}>
								<Image src={WorkerIcon} />
							</Icon>
							&nbsp;{WorkerTypeLabel[jobCard.skillType]}
						</Typography>
						<Typography className='vAlignCenter' variant='body2' color={primary.properDark}>
							{/* <LocationOn fontSize='inherit' /> */}
							<Icon fontSize='inherit' style={{ display: 'flex' }}>
								<Image src={LocationIcon} />
							</Icon>
							&nbsp;{jobCard.city}, {jobCard.state}
						</Typography>
						<Typography className='vAlignCenter' variant='body2' color={primary.properDark}>
							{/* <EqualizerRounded fontSize='inherit' /> */}
							<Icon fontSize='inherit' style={{ display: 'flex' }}>
								<Image src={ExperienceIcon} />
							</Icon>
							&nbsp;{jobCard.experience} Years
							{/* Years Of Experience */}
						</Typography>
					</Stack>
					<Button>
						<Stack spacing={2} direction={'row'} alignItems={'center'}>
							<Box>
								<img src='/assets/icons/buttonCall.svg' />
							</Box>
							<Typography variant='body1' color={primary.properDark} fontWeight={700}>
								Call {jobCard.phoneNumber ?? ' 	'}
							</Typography>
						</Stack>
					</Button>
				</Stack>
			</Stack>
		</CustomPaper>
	)
}
