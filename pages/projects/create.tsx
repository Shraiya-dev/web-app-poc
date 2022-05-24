import { Box } from '@mui/material'
import { NextPage } from 'next'
import Head from 'next/head'
import { CreateProject } from '../../modules/createProject/components/createProject'
import Layout from '../../sdk/layouts/DashboardLayout'

const Create: NextPage = () => {
	return (
		<>
			<Head>
				<title>Project Hero</title>
				<meta name='description' content='' />
			</Head>

			<Box>
				<CreateProject />
			</Box>
		</>
	)
}

export default Create
