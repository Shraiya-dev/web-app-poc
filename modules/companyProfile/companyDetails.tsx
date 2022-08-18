import { TabContext, TabPanel } from '@mui/lab'
import { Box, Stack, styled, Tab, Tabs, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { theme, useContractorAuth, useMobile } from '../../sdk'
import { HorizontalTabClicked } from '../../sdk/analytics/analyticsWrapper'
import { CustomTopBar } from '../../sdk/components/topBar/customTopBar'
import CompanyMembers from './components/companyMembers'
import CompanyInfo from './components/companyInfo'
import useCompanyDetails from './hooks/useCompanyDetails'
import { useEffect } from 'react'
import { BottomLayout } from 'sdk/layouts/BottomLayout'

const CompanyDetailsStyle = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	minHeight: 'calc(100vh - 400px)',
	maxHeight: 'calc(100vh - 400px)',
}))
const CompanyDetails = () => {
	const { user, getContactorUserInfo } = useContractorAuth()
	const isMobile = useMobile()

	const { selectedTab, handleTabSelection } = useCompanyDetails()
	const router = useRouter()

	useEffect(() => {
		getContactorUserInfo()
	}, [router])

	return (
		<>
			<CompanyDetailsStyle>
				<CustomTopBar>
					<Stack m={2}>
						<Typography
							sx={{
								fontSize: 26,
								fontWeight: 700,
								color: theme.palette.secondary.main,
								fontFamily: 'Saira,sans-serif',
							}}>
							Company Profile
						</Typography>
						<Typography
							sx={{
								fontSize: 14,
								color: theme.palette.secondary.main,
								fontFamily: 'Karla,sans-serif',
							}}>
							{user?.companyName}
						</Typography>
					</Stack>
				</CustomTopBar>
				<Stack>
					<TabContext value={selectedTab}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 0 }}>
							<Tabs
								TabIndicatorProps={{
									sx: {
										height: '3px',
									},
								}}
								value={selectedTab}
								onChange={handleTabSelection}>
								<Tab
									sx={{
										fontSize: '18px',
										textTransform: 'none',
										fontFamily: 'Karla ,sans-serif',
										fontWeight: 700,
									}}
									value='details'
									label='Company Details'
									onClick={() => {
										router.replace(`/profile/details`)
										HorizontalTabClicked({
											name: 'Company Details',
											page: 'Company Profile',
											url: router.asPath,
										})
									}}
								/>

								{/* <Tab
									sx={{
										fontSize: '18px',
										textTransform: 'none',
										fontFamily: 'Karla ,sans-serif',
										fontWeight: 700,
									}}
									value='members'
									label='Company Members'
									onClick={() => {
										router.replace(`/profile/members`)
										HorizontalTabClicked({
											name: 'Company Members',
											page: 'Company Profile',
											url: router.asPath,
										})
									}}
								/> */}
							</Tabs>
						</Box>

						<TabPanel
							value='details'
							sx={{
								height: 'calc( 100vh - 190px )',
								overflowY: 'auto',
								position: 'relative',
								paddingTop: 1,
							}}>
							<CompanyInfo />
						</TabPanel>
						{/* 
						<TabPanel
							value='members'
							sx={{
								height: 'calc( 100vh - 190px )',
								overflowY: 'auto',
								position: 'relative',
								paddingTop: 1,
							}}
						>
							<CompanyMembers />
						</TabPanel> */}
					</TabContext>
				</Stack>
			</CompanyDetailsStyle>
			{isMobile && <BottomLayout />}
		</>
	)
}

export default CompanyDetails
