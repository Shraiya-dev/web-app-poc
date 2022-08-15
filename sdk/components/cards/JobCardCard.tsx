import { Engineering, EqualizerRounded, LocationOn } from '@mui/icons-material'
import { Box, Button, Card, Chip, Grid, Icon, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { JobCardStateLabel, primary } from '../../constants'
import { JobCard, JobCardState } from '../../types'
import { JobCardStatusChip } from '../chips/jobCardStatusChip'
import EngineeringIcon from '@mui/icons-material/Engineering'
import { WorkerTypeLabel } from '../../constants/worker'
import WorkerType from '../../../public/assets/icons/workerType.svg'
import LocationIcon from '../../../public/assets/icons/location.svg'
import ExperienceIcon from '../../../public/assets/icons/experience.svg'
import WorkerIcon from '../../../public/assets/icons/workerIcon.svg'
import { useMobile } from 'sdk/hooks'

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
	const isMobile = useMobile()
	return (
		<CustomPaper elevation={1}>
			<Stack flex={1} direction={{ xs: 'row', md: 'column' }} spacing={2} alignItems='center' height='100%'>
				<Stack
					position='relative'
					sx={{ height: '33%', width: '33%', borderRadius: '50%', overflow: 'hidden' }}>
					<img
						width={'100%'}
						height={'100%'}
						src={jobCard?.workerImage?.length > 0 ? jobCard?.workerImage : '/assets/icons/workerIcon.svg'}
					/>
				</Stack>
				<Stack direction={'column'} spacing={1} flex={1} alignItems={{ xs: 'flex-start', md: 'center' }}>
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
				<Button
					onClick={() => {
						window.open('tel:9575418224')
					}}>
					<Stack spacing={1} direction={'row'} alignItems={'center'}>
						<Box>
							<img src='/assets/icons/buttonCall.svg' />
						</Box>
						<Typography
							fontFamily={'Karla,sans-serif'}
							fontWeight={700}
							variant='body1'
							color={primary.properDark}>
							Call {jobCard.phoneNumber ?? ' 	'}
						</Typography>
					</Stack>
				</Button>
			</Stack>
		</CustomPaper>
	)
}
