import { BusinessRounded } from '@mui/icons-material'
import { Box, Card, Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { JobTypeLabel } from 'sdk/constants'
import { JOB_TYPES } from 'sdk/types'
import { Worker } from 'sdkv2/types'
import { HeroCardImage } from '../atomic'
import { JobCategoryIcon } from '../icons'
interface Props {
	worker?: Worker
}
export const WorkerCard: FC<Props> = ({ worker }) => {
	return (
		<Card sx={{ flex: 1, overflow: 'hidden' }}>
			<Stack direction='row' p={2} spacing={2}>
				<Stack>
					<HeroCardImage src={worker?.profileImage} />
				</Stack>
				<Stack flex={1} spacing={1}>
					<Typography flex={1} display='flex' alignItems='center' variant='h4'>
						{worker?.name}&nbsp;&nbsp;
						<img src='/assets/landingv2/icons/verified.svg' />
					</Typography>
					<Stack direction='row' spacing={1}>
						<JobCategoryIcon style={{ width: 24, height: 24, marginTop: 5 }} jobType={worker?.jobType} />
						<Typography flex={1} display='flex' alignItems='center' variant='h5' fontWeight={100}>
							{JobTypeLabel[worker?.jobType as JOB_TYPES]} | {worker?.skillType}
						</Typography>
					</Stack>
					<Stack direction='row' spacing={1}>
						<BusinessRounded />

						<Typography flex={1} variant='h5' fontWeight={100}>
							<strong>{worker?.experience?.years}</strong> years experience | Worked with{' '}
							<strong>{worker?.experience?.organization}</strong>
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
						.fill('/assets/landingv2/icons/rate1.svg', 0, worker?.rating ?? 0)
						.map((item, index) => (
							<Box key={index}>
								<img src={item} />
							</Box>
						))}
				</Stack>
			</Stack>
		</Card>
	)
}
