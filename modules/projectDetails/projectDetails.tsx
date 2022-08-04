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
import { WorkReport } from '../workReport'
import { Bills } from '../bills'
import { LocationOnOutlined } from '@mui/icons-material'
import { FC } from 'react'
interface Props {}
export const tabList: { [key in string]: string } = {
	'work-report': 'Work Report',
	bookings: 'Bookings',
	details: 'Details',
	bills: 'Bills',
}
export const ProjectDetails: FC<Props> = () => {
	const { selectedTab, handleTabSelection, projectDetails } = useProjectDetails()
	const isMobile = useMobile()
	const router = useRouter()

	return (
		<>
			<CustomTopBar>
				<Stack flex={1} direction='row' alignItems='flex-start'>
					<Stack direction='row' justifyContent={'flex-start'} flex={1}>
						<Typography
							style={{
								fontSize: isMobile ? 18 : 26,
								fontWeight: 700,
								color: theme.palette.secondary.main,
							}}
						>
							<ArrowBackIosNewIcon
								onClick={() => router.push('/dashboard')}
								sx={{
									verticalAlign: 'middle',
									color: primary.main,
									fontSize: 24,
									cursor: 'pointer',
								}}
							/>
						</Typography>
						<Stack>
							<Typography
								style={{
									fontSize: isMobile ? 18 : 26,
									fontWeight: 700,
									color: theme.palette.secondary.main,
								}}
							>
								{projectDetails?.name}
							</Typography>
							<Typography
								sx={{ fontSize: 14, color: theme.palette.secondary.main }}
								textTransform='capitalize'
							>
								<LocationOnOutlined style={{ fontSize: 12, verticalAlign: 'middle' }} />
								&nbsp;{projectDetails?.city} , {projectDetails?.state}
							</Typography>
						</Stack>
					</Stack>
				</Stack>
			</CustomTopBar>
			<TabContext value={router.query.tab as string}>
				<Box
					sx={{
						borderBottom: 1,
						borderColor: 'divider',
						marginBottom: 0,
						overflowX: isMobile ? 'scroll' : '',
						'&::-webkit-scrollbar': {
							display: 'none',
						},
					}}
				>
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
					{!isMobile ? (
						<Tabs
							TabIndicatorProps={{
								style: {
									height: '3px',
								},
							}}
							value={router.query.tab as string}
							onChange={handleTabSelection}
						>
							{Object.keys(tabList).map((tab, index) => {
								if (tab === 'bills') {
									return (
										projectDetails?.generateBills && (
											<Tab
												sx={{
													fontSize: '18px',
													textTransform: 'none',
												}}
												value='bills'
												label='Bills'
											/>
										)
									)
								}
								return (
									<Tab
										key={tab}
										sx={{
											fontSize: '18px',
											textTransform: 'none',
										}}
										value={tab}
										label={tabList[tab]}
									/>
								)
							})}
						</Tabs>
					) : (
						<Box
							sx={{
								width: '120%',
								overflowX: 'scroll',
							}}
						>
							<Tabs
								TabIndicatorProps={{
									style: {
										height: '3px',
									},
								}}
								value={router.query.tab as string}
								onChange={handleTabSelection}
							>
								{Object.keys(tabList).map((tab, index) => {
									if (tab === 'bills') {
										return (
											projectDetails?.generateBills && (
												<Tab
													sx={{
														fontSize: '18px',
														textTransform: 'none',
													}}
													value='bills'
													label='Bills'
												/>
											)
										)
									}
									return (
										<Tab
											key={tab}
											sx={{
												fontSize: '18px',
												textTransform: 'none',
											}}
											value={tab}
											label={tabList[tab]}
										/>
									)
								})}
							</Tabs>
						</Box>
					)}
				</Box>

				<TabPanel
					value='bookings'
					sx={{
						padding: isMobile ? 1 : 3,
					}}
					style={{
						height: 'calc( 100vh - 160px )',
						overflowY: 'auto',
						position: 'relative',
					}}
				>
					<Dashboard />
				</TabPanel>
				<TabPanel
					sx={{
						padding: isMobile ? 0 : 3,
					}}
					value='work-report'
					style={{
						height: `calc( 100vh - ${!isMobile ? '130px' : '190px'} )`,
						overflowY: 'auto',
						paddingBottom: 0,
						position: 'relative',
					}}
				>
					<WorkReport />
				</TabPanel>
				<TabPanel
					sx={{
						padding: isMobile ? 1 : 3,
					}}
					value='bills'
					style={{
						height: `calc( 100vh - ${!isMobile ? '130px' : '190px'} )`,
						overflowY: 'auto',
						paddingBottom: 0,
						position: 'relative',
					}}
				>
					<Bills />
				</TabPanel>
				<TabPanel
					value='details'
					sx={{
						padding: isMobile ? 1 : 3,
					}}
					style={{
						height: 'calc( 100vh - 160px )',
						overflowY: 'auto',
						position: 'relative',
					}}
				>
					<ProjectInfo />
				</TabPanel>
			</TabContext>
		</>
	)
}
