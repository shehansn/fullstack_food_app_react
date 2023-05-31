import React, { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom";
import { Dashboard, Login, Main } from './containers';
import { getAuth } from 'firebase/auth';
import { app } from './config/firebase.config';
import { useDispatch, useSelector } from 'react-redux';
import { validateUserJWTToken, getAllProducts, getAllCartItems } from './api';
import { setUserDetails } from './context/actions/userAction'
import { setAllProducts } from './context/actions/productAction'

import { fadeInOut } from './animations';
import { motion } from 'framer-motion';
import { Alert, CheckoutSuccess, MainLoader, UserOrders } from './components';
import { setCartItems } from './context/actions/cartAction';

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
                        if (data) {
                            getAllCartItems(data?.user_id).then((items) => {
                                console.log("cart items from app.js", items);
                                dispatch(setCartItems(items))

                            })
                        }
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

        getAllProducts().then((data) => {
            console.log("product data from app.js", data)
            dispatch(setAllProducts(data));
        });

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
                <Route path='/checkout-success' element={<CheckoutSuccess />} />
                <Route path='/user-orders' element={<UserOrders />} />
            </Routes>
            {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
        </div >
    )
}

export default App
