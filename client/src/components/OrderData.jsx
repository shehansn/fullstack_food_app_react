import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { buttonClick, staggerFadeInOut } from '../animations'
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, updateOrderSts } from '../api';
import { setAllOrders } from '../context/actions/ordersAction';
import { alertInfo, alertNULL, alertSuccess } from '../context/actions/alertActions';

const OrderData = ({ index, data, admin }) => {

    const orders = useSelector((state) => state.orders);
    const dispatch = useDispatch();


    const handleClick = (orderId, sts) => {
        updateOrderSts(orderId, sts).then((response) => {
            getAllOrders().then((data) => {
                console.log("orders from orderData", data);
                dispatch(setAllOrders(data))
            })
        })
        dispatch(alertSuccess("Order Status Updated"));
        setInterval(() => {
            dispatch(alertNULL())
        }, 4000)
        console.log(orderId, sts)
    }
    return (
        <motion.div key={index} {...staggerFadeInOut(index)}
            className='w-full flex flex-col items-start px-3 py-2 border relatve border-gray-300 bg-cardOverlay drop-shadow-md rounded-md gap-4' >
            <div className='w-full flex items-center justify-between'>
                <h1 className='text-xl text-headingColor font-semibold'>Orders</h1>
                <div className='flex items-center gap-4'>

                    <p className='flex items-center gap-1 text-textColor'>Total: <span className='font-bold text-headingColor'>{data?.total}</span>LKR</p>

                    <p className='px-2 py-[2px] text-sm text-headingColor font-semibold capitalize rounded-md bg-emerald-400 drop-shadow-md' >
                        {data?.status}
                    </p>
                    <p className={`text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md
                        ${(data?.sts === "processing" && "text-orange-500 bg-orange-100") ||
                        (data?.sts === "cancelled" && "text-red-500 bg-red-100") ||
                        (data?.sts === "delivered" && "text-emerald-500 bg-emerald-100")
                        }`}>
                        {data?.sts}
                    </p>
                    {admin && (
                        <>
                            <div className='flex items-center justify-center gap-2'>
                                <p className='text-lg font-semibold text-headingColor'>Mark As </p>
                                <motion.p {...buttonClick}
                                    onClick={() => handleClick(data?.orderId, "processing")}
                                    className={`text-orange-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md
                                         cursor-pointer`}>
                                    Processing
                                </motion.p>
                                <motion.p {...buttonClick}
                                    onClick={() => handleClick(data?.orderId, "cancelled")}
                                    className={`text-red-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md
                                         cursor-pointer`}>
                                    Cancelled
                                </motion.p>
                                <motion.p {...buttonClick}
                                    onClick={() => handleClick(data?.orderId, "delivered")}
                                    className={`text-emerald-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md
                                         cursor-pointer`}>
                                    Delivered
                                </motion.p>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className='flex items-center justify-start flex-wrap w-full '>
                <div className='flex items-center justify-center gap-4'>
                    {data?.items && data?.items.map((item, j) => (
                        <motion.div {...staggerFadeInOut(j)} key={j} className='flex items-center justify-center gap-1'>
                            <img src={item?.imageURL} className='w-10 h-10 object-contain' alt='item-image' />
                            <div className='flex items-start flex-col'>
                                <p className='text-base font-semibold text-headingColor'>{item?.product_name}</p>
                                <div className='flex items-start gap-2'>
                                    <p className='text-sm text-textColor'>
                                        {" "}Qty : {item?.quantity}
                                    </p>
                                    <p className='flex items-center gap-1 text-textColor'>{parseFloat(item?.product_price).toFixed(2)}{' '}LKR</p>
                                </div>
                            </div>

                        </motion.div>
                    ))}

                </div>
                <div className={`flex items-start justify-start flex-col gap-2 px-6 ml-auto w-full md:w-460`}>
                    <h1 className='text-lg text-headingColor font-semibold'>
                        {data?.shipping_details.name}
                    </h1>
                    <p className='text-base text-headingColor -mt-2'>{data?.customer.email} {' '}{data?.customer.phone}</p>
                    <p className='text-base text-textColor -mt-2'>
                        {data?.shipping_details.address.line1},
                        {data?.shipping_details.address.line2}{' '}
                        {data?.shipping_details.address.country},
                        {data?.shipping_details.address.state},
                        {data?.shipping_details.address.postal_code},
                    </p>
                </div>
            </div>

        </motion.div>
    )
}

export default OrderData
