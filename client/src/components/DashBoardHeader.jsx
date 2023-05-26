import React, { useState } from 'react'
import { BsFillBellFill, BsToggle2On, MdLogout, MdSearch } from '../assets/icons';
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion';
import { buttonClick, slideTop } from '../animations';
import { Avatar } from '../assets';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { setUserNull } from '../context/actions/userAction';
import { app } from '../config/firebase.config'

const DashBoardHeader = () => {
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
        <div className='w-full flex items-center justify-between gap-2 '>
            <p className='text-2xl text-headingColor'>Welcome to SNFoodees {' '} {user?.name && (
                <span className='block text-base text-gray-500'>{`Hello ${user?.name} ...!`}</span>)}
            </p>

            <div className='flex gap-5'>
                <div className='flex items-center justify-center gap-4'>
                    <div className='flex items-center justify-center gap-3 px-4 py-2 bg-cardOverlay backdrop-blur-md rounded-md shadow-md'>
                        <MdSearch className='text-gray400 text-2xl' />
                        <input type='text' placeholder='Search Here...' className='border-none outline-none bg-transparent w-32 text-base font-semibold text-textColor' />
                        <BsToggle2On className='text-gray400 text-2xl cursor-pointer' />
                    </div>
                </div>

                <motion.div {...buttonClick} className='w-10 h-10 rounded-md cursor-pointer bg-cardOverlay backdrop-blur-md shadow-md flex items-center justify-center'>
                    <BsFillBellFill className='text-gray-400 text-xl' />
                </motion.div>

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
                        <motion.div {...slideTop} className='z-50 px-6 py-4 w-48 bg-cardOverlay backdrop-blur-md rounded-md shadow-md absolute top-10 right-0 flex flex-col gap-4'>

                            <motion.div {...buttonClick} className='group flex items-center justify-center px-3 py-2 rounded-md hover:bg-gray-200 gap-3'>
                                <Link className='hover:text-red-500 text-xl text-textColor' to={"/"} >Home </Link>
                            </motion.div>

                            <motion.div {...buttonClick} onClick={signOut} className='group flex items-center justify-center px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 gap-3'>
                                <MdLogout className='text-2xl text-textColor group-hover::text-headingColor' />
                                <p className='text-textColor group-hover::text-headingColor'>Sign Out</p>
                            </motion.div>
                        </motion.div>
                    )}

                </div>
            </div>

        </div>
    )
}

export default DashBoardHeader
