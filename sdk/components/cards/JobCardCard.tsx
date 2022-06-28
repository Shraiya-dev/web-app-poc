import { Engineering, EqualizerRounded, LocationOn } from '@mui/icons-material'
import { Chip, Icon, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { JobCardStateLabel } from '../../constants'
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
	'.profileImage': {
		width: 125,
		backgroundPosition: 'center',
		backgroundFit: 'cover',
		backgroundRepeat: 'no-repeat',
	},

	'.vAlignCenter': {
		display: 'flex',
		alignItems: 'center',
	},
}))
interface JobCardCardProps {
	jobCard: JobCard
}

export const JobCardCard = ({ jobCard }: JobCardCardProps) => {
	console.log('profilePicture', jobCard?.workerImage)
	return (
		<CustomPaper elevation={1}>
			<Stack flex={1} direction='row'>
				<Stack
				// className='profileImage'
				// sx={{
				// 	backgroundImage:
				// 		jobCard?.workerImage?.length > 0
				// 			? `url(${jobCard?.workerImage})`
				// 			: 'url(/assets/icons/workerIcon.svg)',
				// }}>
				>
					<img
						src={jobCard?.workerImage?.length > 0 ? jobCard?.workerImage : '/assets/icons/workerIcon.png'}
						style={{
							maxHeight: 154,
							maxWidth: 125,
							objectFit: 'cover',
							marginBottom: 0,
						}}
					/>
				</Stack>
				<Stack flex={1} p={2}>
					<Stack mb={1} direction='row' justifyContent='space-between'>
						<Typography variant='h6' fontWeight={600}>
							{jobCard.WorkerName ?? 'No Name'}
						</Typography>

						<JobCardStatusChip jobCardState={jobCard.jobCardState} sx={{ verticalAlign: 'middle' }} />
						{/* <Link href={`/worker/${jobCard.workerId}`} passHref>
							<Typography component={'a'} color='primary.main'>
								View
							</Typography>
						</Link> */}
					</Stack>
					<Stack flex={1} alignItems='flex-start' spacing={1}>
						{/* <Chip variant='outlined' color='primary' label={jobCard?.skillType} /> */}
						{/* <Typography className='vAlignCenter' variant='body2'>
							<Engineering fontSize='inherit' color='error' />
							&nbsp;{jobCard.projectCount} Projects
						</Typography> */}
						<Typography className='vAlignCenter' variant='body2' color='secondary.main'>
							{/* <EngineeringIcon fontSize='inherit' /> */}
							<Icon fontSize='inherit' style={{ display: 'flex' }}>
								<Image src={WorkerType} />
							</Icon>
							&nbsp;{WorkerTypeLabel[jobCard.skillType]}
						</Typography>
						<Typography className='vAlignCenter' variant='body2' color='secondary.main'>
							{/* <LocationOn fontSize='inherit' /> */}
							<Icon fontSize='inherit' style={{ display: 'flex' }}>
								<Image src={LocationIcon} />
							</Icon>
							&nbsp;{jobCard.city}, {jobCard.state}
						</Typography>
						<Typography className='vAlignCenter' variant='body2' color='secondary.main'>
							{/* <EqualizerRounded fontSize='inherit' /> */}
							<Icon fontSize='inherit' style={{ display: 'flex' }}>
								<Image src={ExperienceIcon} />
							</Icon>
							&nbsp;{jobCard.experience} Years Of Experience
						</Typography>
					</Stack>
				</Stack>
			</Stack>
		</CustomPaper>
	)
}
