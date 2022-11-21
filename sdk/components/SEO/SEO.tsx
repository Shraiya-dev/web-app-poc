import Head from 'next/head'
import { FC } from 'react'

export interface Props {
	title: string
	description?: string
}
export const SEO: FC<Props> = ({ children, description, title }) => {
	return (
		<Head>
			<title>{title} | ProjectHero</title>
			<meta name='description' content={description} />
			{children}
		</Head>
	)
}
