import React from 'react'
import { MdShoppingCart } from '../assets/icons'
import { motion } from 'framer-motion'
import { buttonClick } from '../animations'
import { addNewItemToCart, getAllCartItems } from '../api'
import { useDispatch, useSelector } from 'react-redux'
import { alertNULL, alertSuccess } from '../context/actions/alertActions'
import { setCartItems } from '../context/actions/cartAction'


const SliderCard = ({ i, data, index }) => {

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const addToCart = () => {
        addNewItemToCart(user?.user_id, data).then(res => {
            dispatch(alertSuccess('Item Add To Cart Successfully'));
            getAllCartItems(user?.user_id).then((items) => {
                console.log("cart items from card slider", items);
                dispatch(setCartItems(items))
            })
            setTimeout(() => {
                dispatch(alertNULL())
            }, 3000);
        })

    }
    return (
        <div className='bg-cardOverlay hover:drop-shadow-lg backdrop-blur-md rounded-xl flex items-center justify-between relative
         px-4 py-2 md:w-510 md:h-225 gap-1 '>
            <div className='w-40 h-40 '>
                <img
                    src={data?.imageURL}
                    alt="img"
                    className="w-full h-full object-contain"
                />
            </div>
            <div className='relative pt-12 items-end justify-between'>
                <motion.div {...buttonClick}
                    onClick={addToCart}
                    className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center absolute right-2 cursor-pointer hover:shadow-md -mt-8 mb-8"
                >
                    <MdShoppingCart className="text-white" />

                </motion.div>
                <div>
                    <p className='text-lg font-semibold text-headingColor'>{data?.product_name}</p>
                    <p className='text-lg font-semibold text-red-500'> {parseFloat(data?.product_price)} <span className='text-textColor font-bold'>LKR</span> </p>
                </div>





            </div>
        </div>
    )
}

export default SliderCard
