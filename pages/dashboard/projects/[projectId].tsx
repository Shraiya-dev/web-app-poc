import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import ContractorDashboardLayout from '../../../sdk/layouts/ContractorDashboardLayout'
import { ProjectDetails } from '../../../modules/projectDetails/projectDetails'

const ProjectIdPage: NextPage = () => {
	const router = useRouter()
	return (
		<>
			<Head>
				<title>{router.query.projectId} | Project Hero </title>
				<meta name='description' content='' />
			</Head>
			<ContractorDashboardLayout>
				<ProjectDetails />
			</ContractorDashboardLayout>
		</>
	)
}
export default ProjectIdPage
