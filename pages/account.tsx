import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'
import PersonalAccount from '../modules/account/components/personalAccount'

import ContractorDashboardLayout from '../sdk/layouts/ContractorDashboardLayout'

const Account: NextPage = () => {
	return (
		<>
			<ContractorDashboardLayout>
				<PersonalAccount />
			</ContractorDashboardLayout>
		</>
	)
}

export default Account

const pageUrl = '/account'
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
