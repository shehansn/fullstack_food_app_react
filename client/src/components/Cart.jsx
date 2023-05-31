import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { FaArrowLeft, RiRefreshFill } from '../assets/icons'
import { buttonClick, slideIn, staggerFadeInOut } from '../animations'
import { useDispatch, useSelector } from 'react-redux'
import { setCartInVisible, setCartVisible } from '../context/actions/displayCartAction'
import { alertSuccess, alertNULL } from '../context/actions/alertActions'
import { decrementItemQuantity, getAllCartItems, incrementItemQuantity } from '../api'
import { setCartItems } from '../context/actions/cartAction'
import axios from 'axios'


const Cart = () => {

    const baseURL = "http://127.0.0.1:5001/fullstack-food-app-react/us-central1/app";

    const cartItems = useSelector((state) => state.cartItems);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [total, setTotal] = useState(0);

    const hideCart = () => {
        dispatch(setCartInVisible())
    }

    const clearCart = () => {

    }

    useEffect(() => {
        if (cartItems) {
            cartItems?.map((data) => {
                setTotal(parseFloat(data?.product_price * data.quantity))
            })
        }
    }, [cartItems]);



    const handleCheckout = () => {
        console.log("checkout clicked1")
        const data = {
            user: user,
            cartItems: cartItems,
            total, total,
        }
        axios
            .post(`${baseURL}/api/products/create-checkout-session`, { data })
            .then((response) => {
                console.log("checkout clicked2")
                console.log("response", response)
                if (response.data.url) {
                    window.location.href = response.data.url
                }
                // setPaymentData(response.data);
            }).catch((err) =>
                console.log("error from cart page when checkout", err)
            );
    }

    return (


        <motion.div {...slideIn} className='fixed top-0 right-0 w-300 md:w-600 h-screen bg-white drop-shadow-md flex flex-col z-50'>

            <div className="w-full flex items-center justify-between p-4 cursor-pointer">
                <motion.div {...buttonClick} onClick={hideCart}>
                    <FaArrowLeft className="text-textColor text-3xl  rounded-full px-2 py-2" />
                </motion.div>
                <p className="text-textColor text-lg font-semibold  px-4 py-2">Cart</p>

                <motion.p
                    {...buttonClick}
                    className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"
                    onClick={clearCart}
                >
                    Clear <RiRefreshFill />
                </motion.p>
            </div>

            <div className="w-full h-full flex flex-col relative gap-3 items-start justify-start rounded-t-3xl bg-zinc-900 py-6  ">
                {cartItems && cartItems?.length ?
                    <>
                        <div className="w-full h-[60%] flex flex-col gap-3 overflow-y-scroll scrollbar-none px-4 ">
                            {cartItems && cartItems?.length > 0 && cartItems?.map((item, i) => (
                                <CartItemCard key={i} data={item} />
                            ))}
                        </div>
                    </>
                    :
                    <>
                        <h1 className='items-center justify-center font-bold capitalize'>Cart Is Empty add items to cart first </h1>
                    </>}

                <div className="w-full h-[40%] flex-1 rounded-t-[2rem] bg-zinc-800 flex flex-col items-center justify-evenly px-8 py-2 pb-24">
                    <div className="w-full flex items-center justify-between">
                        <p className="text-gray-400 text-lg">Sub Total</p>
                        <p className="text-gray-400 text-lg"> {total} {' '} <span className='font-semibold'>LKR</span></p>
                    </div>
                    <div className="w-full flex items-center justify-between">
                        <p className="text-gray-400 text-lg">Delivery</p>
                        <p className="text-gray-400 text-lg"> 2.5 {' '} <span className='font-semibold'>LKR</span></p>
                    </div>

                    <div className="w-full border-b border-gray-600 my-2"></div>

                    <div className="w-full flex items-center justify-between">
                        <p className="text-gray-200 text-xl font-semibold">Total</p>
                        <p className="text-gray-200 text-xl font-semibold">
                            {total + 2.5}{' '} <span className='font-semibold'>LKR</span>
                        </p>
                    </div>
                    <motion.div {...buttonClick}
                        onClick={handleCheckout}
                        className="w-full flex items-center justify-center rounded-lg bg-green-800 hover:bg-green-600 cursor-pointer">
                        <p className="text-white text-xl font-bold px-4 py-2 ">Checkout</p>

                    </motion.div>

                </div>
            </div>



        </motion.div>
    )
}

export const CartItemCard = ({ index, data }) => {

    const cartItems = useSelector((state) => state.cartItems);
    const user = useSelector((state) => state.user);
    const [itemsTotal, setItemsTotal] = useState(0);
    const dispatch = useDispatch();

    const decrementCart = (productId) => {
        dispatch(alertSuccess('Cart Item Updated'))
        decrementItemQuantity(user?.user_id, productId, "decrement").then((data) => {
            getAllCartItems(user?.user_id).then((items) => {
                dispatch(setCartItems(items))

            })
            setTimeout(() => {
                dispatch(alertNULL())
            }, 3000);
        })
    }
    const incrementCart = (productId) => {
        dispatch(alertSuccess('Cart Item Updated'))
        incrementItemQuantity(user?.user_id, productId, "increment").then((data) => {
            getAllCartItems(user?.user_id).then((items) => {
                dispatch(setCartItems(items))

            })
            setTimeout(() => {
                dispatch(alertNULL())
            }, 3000);
        })
    }

    useEffect(() => {
        setItemsTotal(parseFloat(data?.product_price * data.quantity))
    }, [itemsTotal, cartItems])

    return (
        <motion.div key={index} {...staggerFadeInOut(index)}>
            <div className="w-full p-1 px-4 rounded-lg bg-zinc-700 drop-shadow-md flex items-center gap-4">
                <img
                    src={data?.imageURL}
                    className="w-24 h-24 min-w-[60px]  object-contain"
                    alt=""
                />
                <div className="flex flex-col items-start justify-start gap-2 w-full">
                    <p className="text-base text-gray-50">{data?.product_name}
                        <span className='text-sm block capitalize text-gray-300'>
                            {data?.product_category}
                        </span>
                    </p>

                    <p className="text-sm block text-red-500 ml-auto font-semibold">
                        {itemsTotal} LKR
                    </p>
                </div>
                <div className="group flex items-center justify-center gap-2 ml-auto cursor-pointer">
                    <motion.div
                        {...buttonClick}
                        className='w-0 h-0 flex items-center justify-center rounded-md drop-shadow-md '
                        onClick={() => decrementCart(data?.productId)}
                    >
                        <p className=' text-2xl font-semibold text-primary '>-</p>
                    </motion.div>

                    <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
                        {data?.quantity}
                    </p>

                    <motion.div
                        {...buttonClick}
                        className='w-0 h-0 flex items-center justify-center rounded-md drop-shadow-md '

                        onClick={() => incrementCart(data?.productId)}
                    >
                        <p className=' text-2xl font-semibold text-primary  '>+</p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

export default Cart
