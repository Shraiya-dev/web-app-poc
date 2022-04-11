import { NextPage } from 'next'
import BookingInfo from '../modules/booking/components/BookingInfo'
import BookingFilters from '../modules/booking/components/BookingFilters'
import BookingCards from '../modules/booking/components/BookingCards'

const Booking: NextPage = () => {
	return (
		<div style={{ top: 0, left: 0, width: '100%', height: '100%', position: 'absolute' }}>
			
				<BookingInfo />
				<BookingFilters />
                <BookingCards />
			
		</div>
	)
}

export default Booking
