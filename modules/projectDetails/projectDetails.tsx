import { LocationOnOutlined } from '@mui/icons-material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { TabContext, TabPanel } from '@mui/lab'
import { Button, Stack, Tab, Tabs, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect, useMemo } from 'react'
import { TutorialBanner } from 'sdk/components/banner/TutorialBanner'
import { BottomLayout } from 'sdk/layouts/BottomLayout'
import {
	ButtonClicked,
	LinkButton,
	theme,
	TutorialProvider,
	useContractorAuth,
	useMobile,
	useTutorial,
} from '../../sdk'
import { CustomTopBar } from '../../sdk/components/topBar/customTopBar'
import { Bills } from '../bills'
import { Dashboard } from '../dashboard'
import ProjectInfo from '../ProjectInfo/components/projectInfo'
import { WorkReport } from '../workReport'
import { useProjectDetails } from './hooks/useProjectDetails'
interface Props {}

export const ProjectDetails: FC<Props> = () => {
	const { handleTabSelection, projectDetails, projectName, setProjectName } = useProjectDetails()
	const { user } = useContractorAuth()
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
	const { anchor } = useTutorial()
	const tabList: { [key in string]: string | undefined } = useMemo(() => {
		if (user?.isEnterprise) {
			return {
				bookings: 'Job Postings',
				'work-report': user?.isEnterprise ? 'Work Report' : undefined,
				bills: user?.isEnterprise && projectDetails?.generateBills ? 'Bills' : undefined,
				details: 'Construction Site Details',
			}
		} else {
			return {
				bookings: 'Job Postings',
				details: 'Construction Site Details',
			}
		}
	}, [projectDetails?.generateBills, user?.isEnterprise])
	useEffect(() => {
		if (!Object.keys(tabList).includes(router.query.tab as string)) {
			router.query.tab = Object.keys(tabList)[0]
			router.replace(router)
		}
	}, [router, tabList])

	return (
		<>
			<CustomTopBar>
				<Stack flex={1} direction='row' justifyContent='space-between' alignItems='center'>
					<Stack direction='row' justifyContent={'flex-start'} flex={1} spacing={1} alignItems='center'>
						<Box
							sx={{
								position: 'relative',
								top: 4,
							}}>
							<Typography
								component='div'
								sx={{
									fontSize: 16,
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
									fontSize: 16,
									fontWeight: 700,
									color: theme.palette.secondary.main,
									fontFamily: 'Saira,sans-serif',
								}}>
								{/* {projectDetails?.name} */}
								{projectName?.name}
							</Typography>
							<Typography
								component='div'
								sx={{
									fontSize: 12,
									color: theme.palette.secondary.main,
									fontFamily: 'Saira,sans-serif',
								}}
								textTransform='capitalize'>
								<LocationOnOutlined sx={{ fontSize: 12, verticalAlign: 'middle' }} />
								&nbsp;{projectName?.city} , {projectName?.state}
							</Typography>
						</Stack>
					</Stack>
					{isMobile && (
						<LinkButton
							href={`/projects/${router?.query?.projectId}/bookings/create`}
							size='small'
							variant='contained'
							sx={{ fontSize: 10 }}
							onClick={() => {
								ButtonClicked({
									action: 'Book Workers',
									page: 'Project',
									projectId: router?.query?.projectId,
									url: router.asPath,
								})
							}}>
							Job Post Karen
						</LinkButton>
					)}
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
					<Tabs
						TabIndicatorProps={{
							sx: {
								height: '3px',
							},
						}}
						value={router.query.tab as string}
						onChange={handleTabSelection}>
						{Object.keys(tabList).map((tab, index) => {
							if (tabList[tab])
								return (
									<Tab
										ref={(e) => {
											if (tab === 'details') anchor.current.PROJECT_DETAILS = e
										}}
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
							else return null
						})}
					</Tabs>
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
					<TutorialBanner>
						Post ki gai aapki sari jobs yahaan dikhegi. &quot;Heroes ko call karen&quot; pe click karne par
						jo bhi heroes ne apply kiya hai unke phone number aapko dikhege.
					</TutorialBanner>
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
					<TutorialBanner>
						Site details wali job posting par 70% zyada heroes apply karte hain. Aapki site details abhi add
						karen aur zyada heroes se baat karen.
					</TutorialBanner>
					<ProjectInfo setProjectName={setProjectName} />
				</TabPanel>
			</TabContext>
			{isMobile && <BottomLayout />}
		</>
	)
}
