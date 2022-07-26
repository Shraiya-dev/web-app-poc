import { Box } from '@mui/material'
import { GetStaticProps, NextPage } from 'next'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'
import { CreateProject } from '../../modules/createProject/components/createProject'

const Create: NextPage = () => {
	return (
		<>
			<Box>
				<CreateProject />
			</Box>
		</>
	)
}

export default Create

const pageUrl = '/projects/create'
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
