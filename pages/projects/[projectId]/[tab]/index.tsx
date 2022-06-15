import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ProjectDetails } from '../../../../modules/projectDetails/projectDetails'
import ContractorDashboardLayout from '../../../../sdk/layouts/ContractorDashboardLayout'

const TabPage: NextPage = () => {
	const router = useRouter()
	return (
		<>
			<Head>
				<title>Project {router.query.tab} | Project Hero </title>
				<meta name='Project' content='' />
			</Head>
			<ContractorDashboardLayout>
				<ProjectDetails />
			</ContractorDashboardLayout>
		</>
	)
}
export default TabPage
