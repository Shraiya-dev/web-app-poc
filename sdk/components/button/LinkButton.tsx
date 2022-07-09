import { Button, ButtonProps } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ButtonClicked } from 'sdk/analytics/analyticsWrapper'

export const LinkButton = ({ href = '', ...rest }: ButtonProps) => {
	return (
		<Link href={href} scroll passHref>
			<a>
				<Button {...rest} />
			</a>
		</Link>
	)
}
