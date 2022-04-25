import { NextPage } from 'next'
import { WorkerProfileInfo } from '../../modules/workerDetails/components/WorkerDetails'
import DashboardLayout from '../../sdk/layouts/DashboardLayout'



const WorkerProfile: NextPage = () => {


	return (
         <DashboardLayout>
            <WorkerProfileInfo />
         </DashboardLayout>
		
    )
}

export default WorkerProfile
