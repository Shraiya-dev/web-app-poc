import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { getPageStaticData } from 'sdk/data/Seo'

export const staticRenderingProvider = (
	pageUrl: string
): {
	getStaticPaths: (context: GetStaticPropsContext) => Promise<GetStaticPathsResult>
	getStaticProps: (context: GetStaticPropsContext) => Promise<GetStaticPropsResult<any>>
} => {
	return {
		getStaticPaths: async (context: GetStaticPropsContext) => {
			return {
				paths: [],
				fallback: 'blocking',
			}
		},
		getStaticProps: async ({ params }: GetStaticPropsContext) => {
			return {
				props: { pageStaticData: getPageStaticData(pageUrl, params) },
				revalidate: 3600, //in seconds
			}
		},
	}
}

export const ServerSidePropProvider = (pageUrl: string) => {
	//todo : refactor this to handel server side rendering with seo support when needed
	// return { props: { SeoData: getMetaData(pageUrl, params) } }
	return { props: {} }
}
