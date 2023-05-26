import React from 'react'
import { NavLink } from 'react-router-dom'
import { Logo } from '../assets'
import { motion } from 'framer-motion'
import { isActiveStyle, isNotActiveStyle } from '../utils/styles'

//dbleft
const DashBoardLeftSection = () => {
    return (
        <div className='h-full py-12 flex flex-col bg-cardOverlay backdrop-blur-md shadow-md min-w-210 w-225 gap-3 '>
            <NavLink to={"/"} className="flex items-center justify-start px-6 gap-2">
                <img src={Logo} className="w-24 object-cover" alt="logo" />
                <p className="text-headingColor text-xl font-semibold"> SN FOODEES</p>
            </NavLink>
            <hr />

            <motion.ul
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 200 }}
                className="flex flex-col gap-2 "
            >
                <NavLink to={"/dashboard/home"} className={({ isActive }) => isActive ? `${isActiveStyle} text-xl px-4 py-1 border-l-8 border-red-500` : `${isNotActiveStyle} text-base`}>
                    Home
                </NavLink>
                <NavLink to={"/dashboard/orders"} className={({ isActive }) => isActive ? `${isActiveStyle} text-xl px-4 py-1 border-l-8 border-red-500` : `${isNotActiveStyle} text-base`}>
                    Orders
                </NavLink>
                <NavLink to={"/dashboard/items"} className={({ isActive }) => isActive ? `${isActiveStyle} text-xl  px-4 py-1 border-l-8 border-red-500` : `${isNotActiveStyle} text-base`}>
                    Items
                </NavLink>
                <NavLink to={"/dashboard/add-items"} className={({ isActive }) => isActive ? `${isActiveStyle} text-xl px-4 py-1 border-l-8 border-red-500` : `${isNotActiveStyle} text-base`}>
                    Add New Items
                </NavLink>
                <NavLink to={"/dashboard/users"} className={({ isActive }) => isActive ? `${isActiveStyle} text-xl px-4 py-1 border-l-8 border-red-500` : `${isNotActiveStyle} text-base`}>
                    Users
                </NavLink>
            </motion.ul>

            <div className='w-full h-225 items-center justify-center flex mt-auto px-2'>
                <div className='h-full w-full rounded-md bg-red-400 flex items-center justify-center flex-col gap-2 px-1 '>

                    <p className='text-2xl font-bold text-red-500'>?</p>

                    <p className='text-xl text-primary font-semibold'>Help center</p>
                    <p className='text-base text-gray-300 text-center'>Having trouble in SNFoodee app. please contact us for more help</p>
                    <p className='px-4 py-1 rounded-full bg-primary text-red-500 cursor-pointer mb-1'>  Get in Touch</p>
                </div>

            </div>


        </div>
    )
}

export default DashBoardLeftSection
