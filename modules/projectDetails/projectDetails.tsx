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
import { FC, useEffect, useMemo } from 'react'
import { BottomLayout } from 'sdk/layouts/BottomLayout'
import useCreateProject from 'modules/createProject/hooks/useProjects'
interface Props {}
export const tabList: { [key in string]: string } = {
	bookings: 'Bookings',
	details: 'Project Details',
	'work-report': 'Work Report',
	bills: 'Bills',
}
export const ProjectDetails: FC<Props> = () => {
	const { selectedTab, handleTabSelection, projectDetails, enterpriseStatus, projectName, setProjectName } =
		useProjectDetails()
	const isMobile = useMobile()
	const router = useRouter()
	const noBack = useMemo(() => {
		if (typeof window === 'undefined') return false
		const val = localStorage?.getItem('noBack')
		if (val === 'true') {
			return true
		}
		return false
	}, [])

	return (
		<>
			<CustomTopBar>
				<Stack flex={1} direction='row' alignItems='flex-start'>
					<Stack direction='row' justifyContent={'flex-start'} flex={1} spacing={2}>
						<Box
							sx={{
								position: 'relative',
								top: 4,
							}}>
							<Typography
								sx={{
									fontSize: isMobile ? 18 : 26,
									fontWeight: 700,
									color: theme.palette.secondary.main,
								}}>
								{/* if noBack is true remove back button else show back button  */}
								{!noBack && (
									<ArrowBackIosNewIcon
										onClick={() => router.push('/dashboard')}
										sx={{
											verticalAlign: 'middle',
											color: '#fff',
											fontSize: 24,
											cursor: 'pointer',
										}}
									/>
								)}
							</Typography>
						</Box>
						<Stack>
							<Typography
								sx={{
									fontSize: { xs: 18, md: 26 },
									fontWeight: 700,
									color: theme.palette.secondary.main,
									fontFamily: 'Saira,sans-serif',
								}}>
								{/* {projectDetails?.name} */}
								{projectName?.name}
							</Typography>
							<Typography
								sx={{
									fontSize: 14,
									color: theme.palette.secondary.main,
									fontFamily: 'Saira,sans-serif',
								}}
								textTransform='capitalize'>
								<LocationOnOutlined sx={{ fontSize: 12, verticalAlign: 'middle' }} />
								&nbsp;{projectName?.city}, {projectName?.state}
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
					}}>
					{!isMobile ? (
						<Tabs
							TabIndicatorProps={{
								sx: {
									height: '3px',
								},
							}}
							value={router.query.tab as string}
							onChange={handleTabSelection}>
							{Object.keys(tabList).map((tab, index) => {
								if (tab === 'bills') {
									return (
										enterpriseStatus &&
										projectDetails?.generateBills && (
											<Tab
												sx={{
													fontSize: '18px',
													textTransform: 'none',
													fontFamily: 'Karla,sans-serif',
													fontWeight: 700,
												}}
												value='bills'
												label='Bills'
											/>
										)
									)
								} else if (tab === 'work-report') {
									return (
										enterpriseStatus && (
											<Tab
												sx={{
													fontSize: '18px',
													textTransform: 'none',
													fontFamily: 'Karla,sans-serif',
													fontWeight: 700,
												}}
												value='work-report'
												label='Work Report'
											/>
										)
									)
								} else if (tab === 'details') {
									return (
										<Tab
											sx={{
												fontSize: '18px',
												textTransform: 'none',
												fontFamily: 'Karla,sans-serif',
												fontWeight: 700,
											}}
											value='details'
											label='Project Details'
										/>
									)
								}
								return (
									<Tab
										key={tab}
										sx={{
											fontSize: '18px',
											textTransform: 'none',
											fontFamily: 'Karla,sans-serif',
											fontWeight: 700,
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
							}}>
							<Tabs
								TabIndicatorProps={{
									sx: {
										height: '3px',
									},
								}}
								value={router.query.tab as string}
								onChange={handleTabSelection}>
								{Object.keys(tabList).map((tab, index) => {
									if (tab === 'bills') {
										return (
											enterpriseStatus &&
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
									} else if (tab === 'work-report') {
										return (
											enterpriseStatus && (
												<Tab
													sx={{
														fontSize: '18px',
														textTransform: 'none',
														fontFamily: 'Karla,sans-serif',
														fontWeight: 700,
													}}
													value='work-report'
													label='Work Report'
												/>
											)
										)
									} else if (tab === 'details') {
										return (
											<Tab
												sx={{
													fontSize: '18px',
													textTransform: 'none',
													fontFamily: 'Karla,sans-serif',
													fontWeight: 700,
												}}
												value='details'
												label='Project Details'
											/>
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
						padding: { xs: 2, md: 3 },
						maxHeight: { xs: 'calc( 100vh - 182px )', md: '' },
						minHeight: { xs: 'calc( 100vh - 182px )', md: '' },
						overflowY: 'auto',
						position: 'relative',
					}}>
					<Dashboard />
				</TabPanel>
				<TabPanel
					value='work-report'
					sx={{
						padding: { xs: 2, md: 3 },

						maxHeight: { xs: 'calc( 100vh - 182px )', md: '' },
						minHeight: { xs: 'calc( 100vh - 182px )', md: '' },
						overflowY: 'auto',
						paddingBottom: 0,
						position: 'relative',
					}}>
					<WorkReport />
				</TabPanel>
				<TabPanel
					value='bills'
					sx={{
						padding: { xs: 2, md: 3 },

						maxHeight: { xs: 'calc( 100vh - 182px )', md: '' },
						minHeight: { xs: 'calc( 100vh - 182px )', md: '' },
						overflowY: 'auto',
						paddingBottom: 0,
						position: 'relative',
					}}>
					<Bills />
				</TabPanel>
				<TabPanel
					value='details'
					sx={{
						padding: { xs: 2, md: 3 },

						maxHeight: { xs: 'calc( 100vh - 182px )', md: '' },
						minHeight: { xs: 'calc( 100vh - 182px )', md: '' },
						overflowY: 'auto',
						position: 'relative',
					}}>
					<ProjectInfo setProjectName={setProjectName} />
				</TabPanel>
			</TabContext>
			{isMobile && <BottomLayout />}
		</>
	)
}
