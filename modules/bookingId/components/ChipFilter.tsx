import { Close } from '@mui/icons-material'
import { Chip, PaletteOptions, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { FC, useCallback, useDebugValue } from 'react'
import { StringDecoder } from 'string_decoder'
interface Props {
	filterOptions: { label: string; value: string }[]
	filterKey: string
	chipStyle?: 'outlined' | 'filled'
	selectedColor?: 'default' | 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning'
}
export const ChipFilter: FC<Props> = ({
	filterOptions,
	filterKey,
	chipStyle = 'outlined',
	selectedColor = 'primary',
}) => {
	const router = useRouter()

	const handelAddFilter = useCallback(
		(newFilter: string) => {
			const filterValues = router.query[filterKey] as string
			if (filterValues) {
				router.query[filterKey] = [...filterValues?.split(','), newFilter].join(',')
			} else {
				router.query[filterKey] = [newFilter].join(',')
			}
			router.replace(router)
		},
		[filterKey, router]
	)
	const isFilterAdded = useCallback(
		(filter: string): boolean => {
			const filterValues = router.query[filterKey] as string
			if (filterValues) {
				return !!filterValues.split(',').includes(filter)
			}
			return false
		},
		[filterKey, router.query]
	)
	const handelDeleteFilter = useCallback(
		(newFilter: string) => {
			const filterValues = router.query[filterKey] as string
			if (filterValues) {
				const newValues = filterValues
					?.split(',')
					.filter((item: string) => item !== newFilter)
					.join(',')
				if (newValues.length > 0) {
					router.query[filterKey] = newValues
				} else {
					delete router.query[filterKey]
				}
			}
			router.replace(router)
		},
		[filterKey, router]
	)

	return (
		<Stack direction='row' spacing={1} alignItems='center'>
			{filterOptions?.map(({ label, value }) => (
				<Chip
					variant={chipStyle}
					color={isFilterAdded(value) ? selectedColor : 'info'}
					sx={{ borderRadius: 2, height: 36 }}
					key={value}
					label={label}
					clickable
					onClick={isFilterAdded(value) ? undefined : (e) => handelAddFilter(value)}
					onDelete={isFilterAdded(value) ? (e) => handelDeleteFilter(value) : undefined}
					deleteIcon={<Close />}
				/>
			))}
		</Stack>
	)
}
