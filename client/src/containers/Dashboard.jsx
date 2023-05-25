import React from 'react'
import { DashBoardLeftSection, DashBoardRightSection } from '../components'

const Dashboard = () => {
    return (
        <div className='w-screen h-screen flex items-center bg-primary '>
            <DashBoardLeftSection />
            <DashBoardRightSection />
        </div>
    )
}

export default Dashboard
