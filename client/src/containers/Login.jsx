import React, { useState } from 'react'
import { LoginBg, Logo } from '../assets'
import { LoginInput } from '../components'
import { FaEnvelope, FaLock, FcGoogle } from '../assets/icons'
import { motion } from 'framer-motion'
import { buttonClick } from '../animations'

import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { app } from '../config/firebase.config'
import { validateUserJWTToken } from '../api'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [userEmail, setUserEmail] = useState("")
    const [isSignUp, setIsSignUp] = useState(false)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const navigate = useNavigate()

    const loginWithGoogle = async () => {
        await signInWithPopup(firebaseAuth, provider).then((userCred) => {
            firebaseAuth.onAuthStateChanged((cred) => {
                if (cred) {
                    cred.getIdToken().then((token) => {
                        validateUserJWTToken(token).then((data) => {
                            console.log("data inside token", data);
                        })
                        console.log("token", token)
                        navigate("/", { replace: true });
                    })

                }
            })
        });

        //localStorage.setItem("user", JSON.stringify(providerData[0]));
    }

    const signupWithEmailPassword = async () => {
        if ((userEmail === '' || password === '' || confirmPassword === '')) {
            //alert message
            console.log("empty values");
        } else {
            if (password === confirmPassword) {

                await createUserWithEmailAndPassword(firebaseAuth, userEmail, password).then(userCred => {
                    firebaseAuth.onAuthStateChanged((cred) => {
                        if (cred) {
                            cred.getIdToken().then((token) => {
                                validateUserJWTToken(token).then((data) => {
                                    console.log("data inside token sign up", data);
                                })
                                setUserEmail('');
                                setPassword("");
                                setConfirmPassword("");
                                console.log("token sign up", token)
                                navigate("/", { replace: true });
                            })
                        }
                    })
                })
                console.log("matched sign up");
            } else {
                console.log("not matched sign up");
            }
        }
        console.log("signup clicked")
    }


    const signinWithEmailPassword = async () => {
        if ((userEmail === '' || password === '')) {
            //alert message
            console.log("empty values");
        } else {
            await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then(userCred => {
                firebaseAuth.onAuthStateChanged((cred) => {
                    if (cred) {
                        cred.getIdToken().then((token) => {
                            validateUserJWTToken(token).then((data) => {
                                console.log("data inside token sign in", data);
                            })
                            setUserEmail('');
                            setPassword("");
                            console.log("token sign in", token)
                            navigate("/", { replace: true });
                        })
                    }
                })
            })
            console.log("matched");

        }
        console.log("signin clicked")
    }

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
                            onClick={signupWithEmailPassword}
                        >
                            Sign Up
                        </motion.button>
                    ) : (
                        <motion.button {...buttonClick}
                            className='w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-600 transition-all duration-150'
                            onClick={signinWithEmailPassword}
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
                <motion.div
                    {...buttonClick}
                    className='flex items-center justify-center px-20 py-2 bg-cardOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4'
                    onClick={loginWithGoogle}

                >
                    <FcGoogle className='text-3xl' />
                    <p className='capitalize text-textColor'>Sign In with Google</p>
                </motion.div>
            </div>
        </div>
    )
}

export default Login
