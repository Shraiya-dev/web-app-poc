import { PaginationProps, Pagination } from '@mui/material'
import { useRouter } from 'next/router'

interface Props extends PaginationProps {
	hasMore?: boolean
	loading?: boolean
}
export const PaginationWithHasMore = ({ hasMore = false, loading = false, ...props }: Props) => {
	const router = useRouter()
	return (
		<Pagination
			page={Number((router.query.pageNumber ?? 0) as string) + 1}
			onChange={async (e, pageNumber) => {
				router.query.pageNumber = String(pageNumber - 1)
				await router.replace(router, undefined, { shallow: true })
			}}
			showFirstButton
			disabled={loading}
			hideNextButton={!hasMore}
			count={hasMore ? 10000 : Number((router.query.pageNumber ?? 0) as string) + 1}
			siblingCount={0}
			boundaryCount={0}
			color='primary'
			{...props}
		/>
	)
}
