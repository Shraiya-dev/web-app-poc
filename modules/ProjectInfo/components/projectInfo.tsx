import { Box, CircularProgress, Grid, IconButton, Paper, Stack, Typography } from '@mui/material'
import { InputWrapper } from '../../../sdk'
import { TextWrapper } from '../../../sdk/components/Input/TextWrapper'
import { JobBenefits } from '../../../sdk/types/jobBenefits'
import { overTimeLabel } from '../../createBooking/utils'
import { useProjectInfo } from '../hooks/useProjectInfo'

const ProjectInfo = () => {
	const { projectInfo, loading } = useProjectInfo()

	return (
		<>
			{loading ? (
				<Stack p={5} alignItems='center'>
					<CircularProgress size={50} />
				</Stack>
			) : (
				<Box mb={0}>
					<Typography fontSize={24} fontWeight={700} pb={2}>
						Site
					</Typography>
					<Stack spacing={5}>
						<TextWrapper id={'siteAddress'} label='Site Address'>
							<Typography>
								{projectInfo?.siteAddress ||
									'' + ',' + projectInfo?.city ||
									'' + ',' + projectInfo?.state ||
									'' + ',' + projectInfo?.pincode ||
									''}
							</Typography>
						</TextWrapper>

						<TextWrapper id='sitePhotos' label='Site Photos'>
							<Grid container>
								{projectInfo?.images?.site?.map((url: any, index: any) => {
									return (
										<Grid item key={index}>
											<Box
												sx={{
													position: 'relative',
													marginRight: 1,
												}}>
												<img
													style={{
														height: 84,
														width: 84,
														objectFit: 'contain',
														borderRadius: 8,
													}}
													src={url}
													alt={'image'}
												/>
											</Box>
										</Grid>
									)
								})}
							</Grid>
						</TextWrapper>
					</Stack>
					<Typography fontSize={24} fontWeight={700} pb={2} pt={8}>
						Worker Benefits
					</Typography>
					<Stack spacing={5}>
						<TextWrapper id='overTimeFactor' label='Over Time Wage'>
							{overTimeLabel[projectInfo?.overTime?.rate || 1]}
						</TextWrapper>
						<TextWrapper id='pfAvailable' label='Provident Fund (PF)'>
							{projectInfo?.benefits?.includes(JobBenefits?.PF) ? 'Yes' : 'No'}
						</TextWrapper>
						<TextWrapper id='esiAvailabe' label='Employee State Insurance (ESI)'>
							{projectInfo?.benefits?.includes(JobBenefits?.INSURANCE) ? 'Yes' : 'No'}
						</TextWrapper>
						<TextWrapper id='isAccomodation' label='Accommodation'>
							{projectInfo?.benefits?.includes(JobBenefits?.ACCOMODATION) ? 'Yes' : 'No'}
						</TextWrapper>

						{projectInfo?.benefits?.includes(JobBenefits?.ACCOMODATION) && (
							<TextWrapper id='accomodationPhotos' label='Accommodation Photos'>
								<Grid container>
									{projectInfo?.images?.accommodations?.map((url: any, index: any) => {
										return (
											<Grid item key={index}>
												<Box
													sx={{
														position: 'relative',
														marginRight: 1,
													}}>
													<img
														style={{
															height: 84,
															width: 84,
															objectFit: 'contain',
															borderRadius: 8,
														}}
														src={url}
														alt={'image'}
													/>
												</Box>
											</Grid>
										)
									})}
								</Grid>
							</TextWrapper>
						)}
						<TextWrapper id='foodAvailable' label='Food'>
							{projectInfo?.benefits?.includes(JobBenefits?.FOOD) ? 'Yes' : 'No'}
						</TextWrapper>
					</Stack>
				</Box>
			)}
		</>
	)
}

export default ProjectInfo
