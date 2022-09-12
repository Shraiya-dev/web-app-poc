import Link from 'next/link'

type Props = {
	href?: string
	children: any
}
export const HyperLink = ({ href = '', children }: Props) => {
	return (
		<Link href={href} passHref>
			<a>{children}</a>
		</Link>
	)
}
