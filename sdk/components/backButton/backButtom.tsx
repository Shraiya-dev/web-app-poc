import { Icon } from '@mui/material'
import Image from 'next/image'
import BackSvg from '../../../public/assets/icons/back.svg'

const BackButton = ({ ...props }) => {
	const { onClick } = props
	return (
		<Icon
			onClick={onClick}
			sx={{
				verticalAlign: 'middle',
				fontSize: 24,
				cursor: 'pointer',
			}}>
			<Image src={BackSvg} />
		</Icon>
	)
}

export default BackButton
