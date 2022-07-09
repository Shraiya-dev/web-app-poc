import Head from 'next/head'
import { WorkReportDetails } from '../../../../modules/workReport'
import ContractorDashboardLayout from '../../../../sdk/layouts/ContractorDashboardLayout'

const Details = () => {
	return (
		<>
			<Head>
				<title>Work Report Details | Project Hero </title>
				<meta name='Project' content='' />
			</Head>
			<WorkReportDetails />
		</>
	)
}

export default Details
