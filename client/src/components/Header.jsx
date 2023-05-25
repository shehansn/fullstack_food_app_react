import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Avatar, Logo } from '../assets'
import { motion } from 'framer-motion'
import { isActiveStyle, isNotActiveStyle } from '../utils/styles'
import { buttonClick, slideTop } from '../animations'
import { MdLogout, MdShoppingCart } from '../assets/icons'
import { useDispatch, useSelector } from "react-redux"
import { getAuth } from 'firebase/auth'
import { app } from '../config/firebase.config'
import { setUserNull } from '../context/actions/userAction'

const Header = () => {
    const user = useSelector((state) => state.user);
    const [isMenu, setIsMenu] = useState(false);
    const firebaseAuth = getAuth(app);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signOut = () => {
        firebaseAuth.signOut().then(() => {
            dispatch(setUserNull());
            navigate("/login", { replace: true });
        })
            .catch((err) => console.log(err))

    }
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
                {user ? <>
                    <div className='relative cursor-pointer ' onMouseEnter={() => setIsMenu(true)}
                        onMouseLeave={() => setIsMenu(false)}>
                        <div className='w-10 h-10 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center'>
                            <motion.img
                                className='w-full h-full object-cover '
                                src={user?.picture ? user?.picture : Avatar}
                                whileHover={{ scale: 1.15 }}
                                referrerPolicy='no-referrer'
                                alt='profile'
                            />
                            {/* <p>when loading google image it sometimes not loading this refererer policy prevent that issue and load image successfully</p> */}


                        </div>
                        {isMenu && (
                            <motion.div {...slideTop} className='px-6 py-4 w-48 bg-cardOverlay backdrop-blur-md rounded-md shadow-md absolute top-10 right-0 flex flex-col gap-4'>
                                <Link className='hover:text-red-500 text-xl text-textColor' to={"/dashboard/home"} onClick={() => setIsMenu(false)}>Dashboard </Link>
                                <Link className='hover:text-red-500 text-xl text-textColor' to={"/profile"} onClick={() => setIsMenu(false)}>My Profile </Link>
                                <Link className='hover:text-red-500 text-xl text-textColor' to={"/user-orders"} onClick={() => setIsMenu(false)}>Orders </Link>
                                <hr />
                                <motion.div {...buttonClick} onClick={signOut} className='group flex items-center justify-center px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 gap-3'>
                                    <MdLogout className='text-2xl text-textColor group-hover::text-headingColor' />
                                    <p className='text-textColor group-hover::text-headingColor'>Sign Out</p>
                                </motion.div>
                            </motion.div>
                        )}

                    </div>
                </> : <>
                    <NavLink to={"/login"}>
                        <motion.button {...buttonClick} className='px-4 py-2 rounded-md shadow-md bg-cardOverlay border border-red-300 cursor-pointer'>
                            Login
                        </motion.button>
                    </NavLink>
                </>}

            </nav>

        </header >

    )
}

export default Header