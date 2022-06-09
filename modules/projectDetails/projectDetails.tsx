import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { TabContext, TabPanel } from '@mui/lab'
import { Button, Stack, Tab, Tabs, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { primary, theme, useMobile } from '../../sdk'
import { Analytic } from '../../sdk/analytics'
import { ButtonClicked, HorizontalTabClicked } from '../../sdk/analytics/analyticsWrapper'
import { CustomTopBar } from '../../sdk/components/topBar/customTopBar'
import { Dashboard } from '../dashboard'
import ProjectInfo from '../ProjectInfo/components/projectInfo'
import { useProjectDetails } from './hooks/useProjectDetails'

export const ProjectDetails = () => {
	const { selectedTab, handleTabSelection, projectDetails } = useProjectDetails()
	const isMobile = useMobile()
	const router = useRouter()

	return (
		<>
			<CustomTopBar>
				<Stack justifyContent={'flex-start'} width={1}>
					<Typography
						style={{
							fontSize: isMobile ? 18 : 26,
							fontWeight: 700,
							color: theme.palette.secondary.main,
						}}>
						<ArrowBackIosNewIcon
							onClick={() => router.push('/dashboard')}
							sx={{
								verticalAlign: 'middle',
								color: primary.main,
								fontSize: 24,
								cursor: 'pointer',
							}}
						/>
						&nbsp;{projectDetails?.name}
					</Typography>
					<Typography
						sx={{ fontSize: 14, color: theme.palette.secondary.main, paddingLeft: 4 }}
						textTransform='capitalize'>
						<LocationOnIcon style={{ fontSize: 12, verticalAlign: 'middle' }} />
						&nbsp;{projectDetails?.city} , {projectDetails?.state}
					</Typography>
				</Stack>

				<Stack justifyContent={'flex-end'} width={1}>
					<Link href={`/projects/${router?.query?.projectId}/bookings/create`} passHref>
						<a>
							<Button
								variant='contained'
								style={{ float: 'right', margin: 16 }}
								onClick={() => {
									ButtonClicked({
										action: 'Book Workers',
										page: 'Project',
										projectId: router?.query?.projectId,
										url: router.asPath,
									})
								}}>
								Book Workers
							</Button>
						</a>
					</Link>
				</Stack>
			</CustomTopBar>
			<TabContext value={selectedTab}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 0 }}>
					{/* <Typography color={primary.main}>
				<ArrowBackIosNewIcon
							onClick={() => router.back()}
							sx={{
								verticalAlign: 'middle',
								color: primary.main,
								fontSize: isMobile ? 16 : 24,
								cursor: 'pointer',
							}}
						/> &nbsp;Back
				</Typography> */}
					<Tabs
						TabIndicatorProps={{
							style: {
								height: '3px',
							},
						}}
						value={selectedTab}
						onChange={handleTabSelection}>
						<Tab
							sx={{
								fontSize: '18px',
								textTransform: 'none',
							}}
							//iconPosition='start'
							// icon={
							// 	<Icon style={{ verticalAlign: 'middle' }}>
							// 		<Image src={BookingsSvg} />
							// 	</Icon>
							// }
							value='bookings'
							label='Bookings'
							//href={`/projects/${router?.query?.projectId}/bookings`}
							onClick={() => {
								router.push(`/projects/${router?.query?.projectId}/bookings`)
								HorizontalTabClicked({
									name: 'Bookings',
									page: 'Project',
									projectId: router?.query?.projectId,
									url: router.asPath,
								})
							}}
						/>

						<Tab
							sx={{
								fontSize: '18px',
								textTransform: 'none',
							}}
							//iconPosition='start'
							// icon={
							// 	<Icon style={{ verticalAlign: 'middle' }}>
							// 		<Image src={ProjectDetailSvg} />
							// 	</Icon>
							// }
							value='projectDetails'
							label='Project Details'
							onClick={() => {
								router.push(`/projects/${router?.query?.projectId}/details`)
								HorizontalTabClicked({
									name: 'Project Details',
									page: 'Project',
									projectId: router?.query?.projectId,
									url: router.asPath,
								})
							}}
							//href={`/projects/${router?.query?.projectId}/details`}
						/>
					</Tabs>
				</Box>

				<TabPanel
					value='bookings'
					style={{
						height: 'calc( 100vh - 160px )',
						overflowY: 'auto',
						position: 'relative',
					}}>
					<Dashboard />
				</TabPanel>

				<TabPanel
					value='projectDetails'
					style={{
						height: 'calc( 100vh - 160px )',
						overflowY: 'auto',
						position: 'relative',
					}}>
					<ProjectInfo />
				</TabPanel>
			</TabContext>
		</>
	)
}
