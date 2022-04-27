import { EqualizerRounded, LocationOn } from '@mui/icons-material'
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
						backgroundImage:
							'url(https://images.unsplash.com/photo-1473090928358-00fcead4f08c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1094&q=80)',
					}}>
					{/* <img
					className='profileImage'
					src={
						
					alt='worker Image'
				/> */}
				</Stack>
				<Stack flex={1} p={2}>
					<Stack direction='row' justifyContent='space-between'>
						<Typography color='primary.main'>{jobCard.workerName}</Typography>
						<Link href={`/worker/${jobCard.workerId}`} passHref>
							<Typography component={'a'} color='primary.main'>
								View
							</Typography>
						</Link>
					</Stack>
					<Stack flex={1} alignItems='flex-start' spacing={1}>
						<Chip variant='outlined' color='primary' label={jobCard?.skillType} />
						<Typography color='secondary.main'>45 Years</Typography>
						<Typography className='vAlignCenter' variant='body2'>
							<LocationOn fontSize='inherit' color='error' />
							&nbsp;{jobCard.projectCount} Projects
						</Typography>
						<Typography className='vAlignCenter' variant='body2'>
							<LocationOn fontSize='inherit' color='error' />
							&nbsp;{jobCard.city}, {jobCard.state}
						</Typography>
						<Typography className='vAlignCenter' variant='body2'>
							<EqualizerRounded fontSize='inherit' color='error' />
							&nbsp;{jobCard.experience} years
						</Typography>
					</Stack>
				</Stack>
			</Stack>
		</CustomPaper>
	)
}
