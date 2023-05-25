import React from 'react'
import { NavLink } from 'react-router-dom'
import { Logo } from '../assets'
import { motion } from 'framer-motion'
import { isActiveStyle, isNotActiveStyle } from '../utils/styles'
import { buttonClick } from '../animations'
import { MdShoppingCart } from '../assets/icons'
import { useSelector } from "react-redux"

const Header = () => {
    const user = useSelector((state) => state.user);
    return (

        <header className='fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-12 md:px-20 py-6 '>
            <NavLink to={"/"} className="flex items-center justify-center gap-4">
                <img src={Logo} className="w-24 object-cover" alt="logo" />
                <p className="text-headingColor text-xl font-semibold"> SN FOODEES</p>
            </NavLink>

            <nav className="flex items-center justify-center gap-8">
                <motion.ul
                    initial={{ opacity: 0, x: 200 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 200 }}
                    className="hidden md:flex items-center justify-center gap-16 "
                >
                    <NavLink to={"/"} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>
                        Home
                    </NavLink>
                    <NavLink to={"/menu"} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>
                        Menu
                    </NavLink>
                    <NavLink to={"/aboutus"} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>
                        About Us
                    </NavLink>
                    <NavLink to={"/services"} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>
                        Service
                    </NavLink>
                </motion.ul>

                <motion.div {...buttonClick} className='relative cursor-pointer'>
                    <MdShoppingCart className="text-textColor text-2xl" />
                    <div className=" absolute -top-4 -right-2 w-5 h-5 rounded-full bg-red-400 flex items-center justify-center">
                        <p className="text-xs text-white font-semibold">
                            2
                        </p>
                    </div>

                </motion.div>


            </nav>

        </header >

    )
}

export default Header