import { BusinessRounded } from '@mui/icons-material'
import { Avatar, Box, Card, Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { JobTypeLabel } from 'sdk/constants'
import { JOB_TYPES } from 'sdk/types'
import { capitalize } from 'sdk/utils'
import { Worker } from 'sdkv2/types'
import { JobCategoryIcon } from '../icons'

interface Props {
	worker?: Worker
}
export const WorkerCard: FC<Props> = ({ worker }) => {
	return (
		<Card sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%' }}>
			<Stack flex={1} direction='row' p={2} spacing={2}>
				<Stack>
					<img
						style={{ width: 100, height: 100, borderRadius: '50%' }}
						src={worker?.profileImage}
						loading='lazy'
					/>
				</Stack>
				<Stack flex={1} spacing={1}>
					<Typography flex={1} display='flex' alignItems='center' variant='h4'>
						{capitalize(worker?.name ?? '')}&nbsp;&nbsp;
						<img src='/assets/landingv2/icons/verified.svg' loading='lazy' />
					</Typography>
					<Stack direction='row' spacing={1}>
						<JobCategoryIcon style={{ width: 24, height: 24, marginTop: 5 }} jobType={worker?.jobType} />
						<Typography flex={1} display='flex' alignItems='center' variant='h5' fontWeight={100}>
							{JobTypeLabel[worker?.jobType as JOB_TYPES]} |{' '}
							{capitalize((worker?.skillType ?? '').toLowerCase())}
						</Typography>
					</Stack>
					<Stack direction='row' spacing={1}>
						<BusinessRounded />

						<Typography flex={1} variant='h5' fontWeight={100}>
							<strong>{worker?.experience ?? '5-8'}</strong> years experience
						</Typography>
					</Stack>
				</Stack>
			</Stack>
			<Stack sx={{ backgroundColor: 'grey.A700' }} p={2} direction='row' justifyContent='space-between'>
				<Typography display='flex' alignItems='center' variant='h5' color='common.white'>
					Rating
					<Typography variant='h3' letterSpacing={3} display='inline' ml={2}>
						{worker?.rating ?? 0}/5
					</Typography>
				</Typography>
				<Stack direction='row' spacing={1}>
					{Array(5)
						.fill('/assets/landingv2/icons/rate0.svg')
						.fill('/assets/landingv2/icons/rate1.svg', 0, Math.round(worker?.rating ?? 0))
						.map((item, index) => (
							<Box key={index}>
								<img src={item} loading='lazy' />
							</Box>
						))}
				</Stack>
			</Stack>
		</Card>
	)
}
