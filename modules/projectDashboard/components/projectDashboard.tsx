import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Box, Button, CircularProgress, Grid, Pagination, Paper, Stack, styled, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import EmptyProject from '../../../public/assets/icons/emptyProject.png'
import { primary, theme, useMobile } from '../../../sdk'
import { Analytic } from '../../../sdk/analytics'
import { ButtonClicked, CardClicked } from '../../../sdk/analytics/analyticsWrapper'
import { ProjectCard } from '../../../sdk/components/cards/ProjectCard'
import { CustomTopBar } from '../../../sdk/components/topBar/customTopBar'
import { useProjectDashboard } from '../hooks/useProjectDashboard'

const CustomProjectDashBoard = styled(Box)(({ theme }) => ({
	padding: 16,
	paddingTop: 0,
	'.info': {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		overflow: 'hidden',

		borderRadius: 8,
		paddingTop: 56,
	},
}))

export const ProjectDashboard = () => {
	const router = useRouter()
	const isMobile = useMobile()

	const { loading, projects, user } = useProjectDashboard()

	return (
		<CustomProjectDashBoard>
			<CustomTopBar>
				<Stack>
					<Typography
						style={{
							fontSize: isMobile ? 20 : 26,
							fontWeight: 700,
							color: theme.palette.secondary.main,
						}}>
						Dashboard
					</Typography>
					<Typography style={{ fontSize: 14, color: theme.palette.secondary.main }}>
						{user?.companyName}
					</Typography>
				</Stack>
			</CustomTopBar>
			<Stack direction={'row'} pt={3} pb={3}>
				<Typography style={{ fontSize: 22, color: theme.palette.secondary.main }}>
					Projects{' '}
					<Button
						startIcon={<AddCircleOutlineIcon style={{ verticalAlign: 'middle' }} />}
						variant='text'
						style={{ verticalAlign: 'middle' }}
						onClick={() => {
							ButtonClicked({
								action: 'Add Project',
								page: 'Dashboard',
								url: router.asPath,
							})
							router.push('/projects/create')
						}}>
						Add Project
					</Button>
				</Typography>
			</Stack>

			{loading ? (
				<Stack p={5} alignItems='center' textAlign={'center'}>
					<CircularProgress size={50} />
				</Stack>
			) : (
				<Grid container spacing={3}>
					{projects.projects.length === 0 ? (
						<Grid item xs={12} md={3}>
							<Paper className='info'>
								<Stack
									justifyContent={'center'}
									onClick={() => {
										CardClicked({
											action: 'Add Project',
											page: 'Dashboard',
											url: router.asPath,
										})
										router.push('/projects/create')
									}}
									style={{ cursor: 'pointer' }}>
									<Stack direction={'row'} justifyContent={'center'} pb={1}>
										<AddCircleOutlineIcon
											style={{ verticalAlign: 'middle', color: primary.main, fontSize: 56 }}
										/>
									</Stack>
									<Typography textAlign={'center'} color={primary.main} fontSize={14}>
										Add a new project to book workers
									</Typography>
								</Stack>

								<Stack direction={'row'} justifyContent={'flex-end'} style={{ marginLeft: 60 }}>
									<Image src={EmptyProject} />
								</Stack>
							</Paper>
						</Grid>
					) : (
						projects.projects.map((project, index) => {
							return (
								<Grid item xs={12} md={3} key={index}>
									<ProjectCard project={project} />
								</Grid>
							)
						})
					)}
				</Grid>
			)}
			{/* TODO : Add paginations */}

			{/* {projects?.projects?.length > 0 && (
						<Stack p={4} alignItems='center'>
							<Pagination
								color='primary'
								page={Number(router.query.pageNumber ?? 0) + 1}
								onChange={(_e, page) => {
									router.query.pageNumber = page - 1 + ''
									router.push(router)
								}}
								count={Math.ceil(projects?.projects?.length / 10)}
							/>
						</Stack>
					)} */}
		</CustomProjectDashBoard>
	)
}
