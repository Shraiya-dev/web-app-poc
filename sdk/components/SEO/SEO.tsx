import Head from 'next/head'
import { FC } from 'react'
export interface Props {
	title: string
	description: string
}
export const SEO: FC<Props> = ({ children, description, title }) => {
	console.log(title)

	return (
		<Head>
			<title>{title} | Project Hero</title>
			<meta name='description' content={description} />
			{children}
		</Head>
	)
}
