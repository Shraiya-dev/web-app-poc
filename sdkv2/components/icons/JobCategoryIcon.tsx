import { DetailedHTMLProps, FC, ImgHTMLAttributes } from 'react'
import { JOB_TYPES } from 'sdk/types'

interface Props extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
	jobType?: JOB_TYPES
}
export const JobCategoryIcon: FC<Props> = ({ jobType, ...rest }) => {
	return jobType ? <img alt={''} {...rest} src={`/assets/landingv2/icons/job/${jobType}.svg`} /> : null
}
