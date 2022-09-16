import { Button, ButtonProps } from '@mui/material'
import Link from 'next/link'

export const LinkButton = ({ href = '', ...rest }: ButtonProps) => {
	return (
		<Link href={href} scroll passHref>
			<a>
				<Button {...rest} />
			</a>
		</Link>
	)
}
