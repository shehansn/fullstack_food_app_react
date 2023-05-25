import React from 'react'
import { DashBoardHeader, DashboardHome, DashboardItems, DashboardNewItems, DashboardOrders, DashboardUsers } from '../components'
import { Route, Routes } from 'react-router-dom'

//dbright
const DashBoardRightSection = () => {
    return (
        <div className='flex flex-col py-12 px-12 flex-1 h-full '>
            <DashBoardHeader />
            <div className='flex flex-col flex-1 overflow-y-scroll scrollbar-none'>
                <Routes>
                    <Route path='/home' element={<DashboardHome />} />
                    <Route path='/orders' element={<DashboardOrders />} />
                    <Route path='/items' element={<DashboardItems />} />
                    <Route path='/add-items' element={<DashboardNewItems />} />
                    <Route path='/users' element={<DashboardUsers />} />
                </Routes>
            </div>
        </div>
    )
}

export default DashBoardRightSection
