import { Engineering, EqualizerRounded, LocationOn } from '@mui/icons-material'
import { Chip, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { JobCardStateLabel } from '../../constants'
import { JobCard, JobCardState } from '../../types'

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
	return (
		<CustomPaper elevation={5}>
			<Stack flex={1} direction='row'>
				<Stack
					className='profileImage'
					sx={{
						backgroundImage: 'url(/assets/icons/worker.svg)',
					}}>
					{/* <img
					className='profileImage'
					src={
						
					alt='worker Image'
				/> */}
				</Stack>
				<Stack flex={1} p={2}>
					<Stack mb={1} direction='row' justifyContent='space-between'>
						<Typography variant='h6' fontWeight={600}>
							{jobCard.WorkerName ?? 'No Name'}
						</Typography>
						{/* <Link href={`/worker/${jobCard.workerId}`} passHref>
							<Typography component={'a'} color='primary.main'>
								View
							</Typography>
						</Link> */}
					</Stack>
					<Stack flex={1} alignItems='flex-start' spacing={1}>
						<Chip variant='outlined' color='primary' label={jobCard?.skillType} />
						{/* <Typography className='vAlignCenter' variant='body2'>
							<Engineering fontSize='inherit' color='error' />
							&nbsp;{jobCard.projectCount} Projects
						</Typography> */}
						<Typography className='vAlignCenter' variant='body2'>
							<LocationOn fontSize='inherit' color='error' />
							&nbsp;{jobCard.city}, {jobCard.state}
						</Typography>
						<Typography className='vAlignCenter' variant='body2'>
							<EqualizerRounded fontSize='inherit' color='error' />
							&nbsp;{jobCard.experience} Years Of Experience
						</Typography>
					</Stack>
				</Stack>
			</Stack>
		</CustomPaper>
	)
}
