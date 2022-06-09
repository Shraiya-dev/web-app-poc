import { Box, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { DESIGNATION, getCustomerRoles, primary, theme } from '../../../sdk'
import { designationLabel } from '../../../sdk/constants/designation'
import useCompanyDetails from '../hooks/useCompanyDetails'

const CompanyMembersStyle = styled(Box)(({ theme }) => ({
	'.info': {
		fontSize: 14,
	},
}))

interface Column {
	id: 'name' | 'email' | 'phoneNumber' | 'designation' | 'isDeleted'
	label: string
	minWidth?: number
	align?: 'right'
}

interface LinkedOrg {
	isDeleted: boolean
	organisationId: string
	role: string
}
interface Row {
	name: string
	email: string
	phoneNumber: string
	designation: DESIGNATION
	linkedOrganisation: LinkedOrg
}

const CompanyMembers = () => {
	const columns: readonly Column[] = [
		{ id: 'name', label: 'Name', minWidth: 160 },
		{ id: 'email', label: 'Email', minWidth: 160 },
		{
			id: 'phoneNumber',
			label: 'Phone Number',
			minWidth: 100,
		},
		{
			id: 'designation',
			label: 'Designation',
			minWidth: 160,
		},
		{
			id: 'isDeleted',
			label: 'Status',
			minWidth: 160,
		},
	]

	const { orgMemberDetails } = useCompanyDetails()

	const [customerRoles, setCustomerRoles] = useState<any[]>([])

	useEffect(() => {
		getCustomerRoles()
			.then((res) => {
				setCustomerRoles(res?.data?.payload?.designations)
			})
			.catch((error) => {
				console.log('error', error)
			})
	}, [])

	function mapInfo(designation: any) {
		return customerRoles?.find((obj) => {
			if (obj.value === designation) {
				return obj.value
			}
		})
	}

	return (
		<CompanyMembersStyle>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{
										minWidth: column.minWidth,
										backgroundColor: primary.light,
										fontWeight: 900,
									}}>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{orgMemberDetails?.map((row: Row) => (
							<TableRow key={row?.name}>
								<TableCell component='th' scope='row'>
									{row?.name}
								</TableCell>
								<TableCell>{row?.email}</TableCell>
								<TableCell>{row?.phoneNumber}</TableCell>

								{/* TODO: Change logic to render */}
								<TableCell style={{ textTransform: 'capitalize' }}>
									{/* {row?.designation ? designationLabel[row?.designation] : '_'} */}
									{row?.designation ? mapInfo(row?.designation)?.label : '_'}
								</TableCell>

								<TableCell style={{ textTransform: 'capitalize' }}>
									{row?.linkedOrganisation?.isDeleted ? 'Inactive' : 'Active'}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</CompanyMembersStyle>
	)
}

export default CompanyMembers
