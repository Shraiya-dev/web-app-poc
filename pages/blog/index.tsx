import { Blog } from 'landing/blogs'
import { GetStaticProps, NextPage } from 'next'
import { LandingLayout } from 'sdk'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'

const Page: NextPage = () => {
	return (
		<>
			<LandingLayout>
				<Blog />
			</LandingLayout>
		</>
	)
}

export default Page

const pageUrl = '/blog'
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
