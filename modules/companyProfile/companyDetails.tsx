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

const CompanyDetailsStyle = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
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
		<CompanyDetailsStyle>
			<CustomTopBar>
				<Stack m={2}>
					<Typography
						style={{
							fontSize: 26,
							fontWeight: 700,
							color: theme.palette.secondary.main,
						}}>
						Company Profile
					</Typography>
					<Typography style={{ fontSize: 14, color: theme.palette.secondary.main }}>
						{user?.companyName}
					</Typography>
				</Stack>
			</CustomTopBar>
			<Stack>
				<TabContext value={selectedTab}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 0 }}>
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

							<Tab
								sx={{
									fontSize: '18px',
									textTransform: 'none',
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
							/>
						</Tabs>
					</Box>

					<TabPanel
						value='details'
						style={{
							height: 'calc( 100vh - 160px )',
							overflowY: 'auto',
							position: 'relative',
							paddingTop: 8,
						}}>
						<CompanyInfo />
					</TabPanel>

					<TabPanel
						value='members'
						style={{
							height: 'calc( 100vh - 160px )',
							overflowY: 'auto',
							position: 'relative',
							paddingTop: 8,
						}}>
						<CompanyMembers />
					</TabPanel>
				</TabContext>
			</Stack>
		</CompanyDetailsStyle>
	)
}

export default CompanyDetails
