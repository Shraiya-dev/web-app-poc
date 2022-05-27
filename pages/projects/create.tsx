import { Box } from '@mui/material'
import { NextPage } from 'next'
import Head from 'next/head'
import Title from 'next/head'
import { CreateProject } from '../../modules/createProject/components/createProject'
import Layout from '../../sdk/layouts/DashboardLayout'

const Create: NextPage = () => {
	return (
		<>
			<Head>
				<Title>Create Project | Project Hero</Title>
				<meta name='Create Project' content='' />
			</Head>

			<Box>
				<CreateProject />
			</Box>
		</>
	)
}

export default Create
