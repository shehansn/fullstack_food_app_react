import React, { useState } from 'react'
import { LoginBg, Logo } from '../assets'
import { LoginInput } from '../components'
import { FaEnvelope, FaLock, FcGoogle } from '../assets/icons'
import { motion } from 'framer-motion'
import { buttonClick } from '../animations'

const Login = () => {

    const [userEmail, setUserEmail] = useState("")
    const [isSignUp, setIsSignUp] = useState(false)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    return (
        <div className='w-screen h-screen relative overflow-hidden flex'>
            {/* background image*/}
            <img src={LoginBg} className='w-full h-full object-cover absolute top-0 left-0' alt='login background image' />.

            {/*content box */}
            <div className='flex flex-col items-center bg-cardOverlay w-[60%] md:w-508 h-full z-10 ml-auto backdrop-blur-md p-4 px-4 gap-6'>
                {/**logo */}
                <div className='flex items-center justify-start gap-4 w-full'>
                    <img src={Logo} className='w-16 rounded-full ' alt='logo' />
                    <p className='text-headingColor font-semibold text-2xl'>SN Foodees</p>

                </div>
                {/**welcome text */}
                <p className='text-3xl font-semibold text-headingColor'>Welcome Back</p>
                <p className='text-xl text-textColor -mt-6'>{isSignUp ? "Sign Up" : "SignIn"} with followings</p>

                {/**input sectioon */}
                <div className='w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4'>
                    <LoginInput
                        placeHolder={"Enter Your Email Here"}
                        icon={<FaEnvelope className='text-xl text-textColor' />}
                        inputState={userEmail}
                        inputStateFunc={setUserEmail}
                        type="email"
                        isSignUp={isSignUp}
                    />
                    <LoginInput
                        placeHolder={"Enter Your Password Here"}
                        icon={<FaLock className='text-xl text-textColor' />}
                        inputState={password}
                        inputStateFunc={setPassword}
                        type="password"
                        isSignUp={isSignUp}

                    />
                    {isSignUp && (
                        < LoginInput
                            placeHolder={"Confirm Your Password"}
                            icon={<FaLock className='text-xl text-textColor' />}
                            inputState={confirmPassword}
                            inputStateFunc={setConfirmPassword}
                            type="password"
                            isSignUp={isSignUp}

                        />
                    )}

                    {!isSignUp ? (
                        <p>
                            Doesn't have an account: {" "}
                            <motion.button {...buttonClick}
                                className='text-red-500 underline cursor-pointer bg-transparent'
                                onClick={() => setIsSignUp(true)}
                            >
                                SignUp
                            </motion.button>
                        </p>
                    ) : (
                        <p>
                            Already have an acoount:{" "}
                            <motion.button {...buttonClick}
                                className='text-red-500 underline cursor-pointer bg-transparent'
                                onClick={() => setIsSignUp(false)}
                            >
                                SignIn
                            </motion.button>
                        </p>
                    )}
                    {/**button section */}
                    {isSignUp ? (
                        <motion.button {...buttonClick}
                            className='w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-600 transition-all duration-150'
                        >
                            Sign Up
                        </motion.button>
                    ) : (
                        <motion.button {...buttonClick}
                            className='w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-600 transition-all duration-150'
                        >
                            Sign In
                        </motion.button>

                    )}

                </div>
                <div className='flex items-center justify-between gap-16 -mt-4'>
                    <div className='w-24 h-[1px] rounded-md bg-white'> </div>
                    <p className='text-white text-xl'> or </p>
                    <div className='w-24 h-[1px] rounded-md bg-white'> </div>
                </div>
                <motion.div {...buttonClick}
                    className='flex items-center justify-center px-20 py-2 bg-cardOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4'
                >
                    <FcGoogle className='text-3xl' /><p className='capitalize text-textColor'>Sign In with Google</p>
                </motion.div>
            </div>
        </div>
    )
}

export default Login
