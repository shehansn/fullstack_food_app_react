import React, { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom";
import { Dashboard, Login, Main } from './containers';
import { getAuth } from 'firebase/auth';
import { app } from './config/firebase.config';
import { useDispatch, useSelector } from 'react-redux';
import { validateUserJWTToken } from './api';
import { setUserDetails } from './context/actions/userAction'

import { fadeInOut } from './animations';
import { motion } from 'framer-motion';
import { Alert, MainLoader } from './components';

const App = () => {
    const firebaseAuth = getAuth(app);
    const [isLoading, setIsLoading] = useState(false)
    const alert = useSelector(state => state.alert);

    const dispatch = useDispatch();

    useEffect(() => {
        //when refreshing validating the user token
        setIsLoading(true);
        firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
                cred.getIdToken().then((token) => {
                    validateUserJWTToken(token).then((data) => {
                        dispatch(setUserDetails(data))
                        console.log("data inside token app.js when refreshing", data);
                    })
                    console.log("token from app.js", token)
                });
            }
            setInterval(() => {
                setIsLoading(false);
            }, 4000);
        })
    }, [])

    return (
        <div className='w-screen min-h-screen h-auto flex flex-col items-center justify-center'>
            {isLoading && (
                <motion.div {...fadeInOut} className='fixed z-50 inset-0 bg-cardOverlay backdrop-blur-md flex items-center justify-center w-full ' >
                    <MainLoader />
                </motion.div>
            )}
            <Routes>
                <Route path='/*' element={<Main />} />
                <Route path='/login' element={<Login />} />
                <Route path='/dashboard/*' element={<Dashboard />} />

            </Routes>
            {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
        </div >
    )
}

export default App
