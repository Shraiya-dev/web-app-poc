import { useState, useEffect } from 'react'
//import { useNavigate, useLocation } from "react-router-dom";
import { useRouter } from 'next/router'
import { useContractorAuth } from '../../../sdk'
import { useFormik } from 'formik'

const initialOtpState = {
	status: 'idle',
	error: '',
}

const validateOtpField = (otp: any) => {
	if (otp.otp.length < 6) {
		return 'Please enter 6 digit OTP'
	}
	return 'valid'
}

const useOtp = () => {
	//   const navigate = useNavigate();
	//   const location = useLocation();

	const router = useRouter()
	const { phoneNumber, verifyOtp, logOut } = useContractorAuth()

	const [otpState, setOtpState] = useState(initialOtpState)
	const { status, error } = otpState

	const [otp, setOtp] = useState({ otp: '' })

	const handleChange = (otp: any) => setOtp({ otp })

	//const comingFrom = location?.state?.from;

	const handleOTPSubmit = async () => {
		console.log('HANDLE OTP SUBMIT', phoneNumber)
		if (!phoneNumber) {
			return router.push('/login')
			//   if (comingFrom === "/login") {
			//     return navigate("/login");
			//   }

			//   if (comingFrom === "/register") {
			//     return navigate("/register");
			//   }
		}

		setOtpState((prev) => ({ ...prev, error: '' }))

		const result = validateOtpField(otp)


		if (result === 'valid') {
			const formattedPhoneNumber = `${phoneNumber}`

			setOtpState((prevValues) => ({
				...prevValues,
				status: 'loading',
			}))

            
			let res;

			//   if (comingFrom === "/register") {
			//     res = await registerByOtp(formattedPhoneNumber, otp.otp);
			//   }
            verifyOtp(formattedPhoneNumber, otp.otp).then((res)=>{
                console.log("00000",res);
            })


			//res = await verifyOtp(formattedPhoneNumber, otp.otp)

            console.log("----",res)

			//   if (comingFrom === "/login") {
			//     res = await verifyOtp(formattedPhoneNumber, otp.otp);
			//   }
          
            
// Todo Change the Routers on fail
			if (res?.data?.success) {
				setOtpState((prevValues) => ({
					...prevValues,
					status: 'success',
				}))
                
				return router.push('/onboarding');
			}

			setOtpState((prevValues) => ({
				...prevValues,
				otp: '',
				status: 'failed',
				error: res?.data?.error,
			}))
			return router.push('/onboarding');
		}

		setOtpState((prev) => ({ ...prev, error: result }))
	}

    const form = useFormik({
		initialValues: {
			phoneNumber: '',
		},

		// validate: (values) => {
		// 	const errors = {}

		// 	if (values.phoneNumber === '' || Number.isNaN(Number(values.phoneNumber))) {
		// 		errors.phoneNumber = 'Enter Valid phone Number'
		// 	}
		// 	return errors
		// },
		onSubmit: (values) => {
			console.log('values', values)
			
			
			
			router.push('/verifyOTP')
		},
	})


	useEffect(() => {
		if (!phoneNumber) {
			//   if (comingFrom === "/login") {
			//     return navigate("/login");
			//   }

			//   if (comingFrom === "/register") {
			//     return navigate("/register");
			//   }
			return router.push('/login')
		}
		if (status === 'success') {
			setOtpState((prevValues) => ({
				...prevValues,
				status: 'idle',
			}))
		}
	}, [status, phoneNumber])

	useEffect(() => {
		if (!phoneNumber) {
			//   if (comingFrom === "/login") {
			//     return navigate("/login");
			//   }

			//   if (comingFrom === "/register") {
			//     return navigate("/register");
			//   }

			return router.push('/login')
		}
		if (status === 'success') {
			setOtpState((prevValues) => ({
				...prevValues,
				status: 'idle',
			}))
		}
	}, [status, phoneNumber])

	return {
		status,
		error,
		otp,
        form,
		handleChange,
		handleOTPSubmit,
	}
}

export default useOtp
