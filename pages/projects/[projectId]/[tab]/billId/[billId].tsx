import Head from 'next/head'
import { BillDetails } from '../../../../../modules/bills'
import { WorkReportDetails } from '../../../../../modules/workReport'
import ContractorDashboardLayout from '../../../../../sdk/layouts/ContractorDashboardLayout'

const Details = () => {
	return (
		<>
			<Head>
				<title>Project Attendance Details | Project Hero </title>
				<meta name='Project' content='' />
			</Head>
			<BillDetails />
		</>
	)
}

export default Details
