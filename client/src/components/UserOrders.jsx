import React, { useEffect, useState } from 'react'
import { Header, OrderData } from '../components'
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../api';
import { setAllOrders } from '../context/actions/ordersAction';

const UserOrders = () => {
    const orders = useSelector((state) => state.orders);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [userOrders, setUserOrders] = useState(null);

    useEffect(() => {
        if (!orders) {
            getAllOrders().then((data) => {
                console.log("orders from dash item", data);
                dispatch(setAllOrders(data))
                setUserOrders(data?.filter((item) => item?.userId === user?.user_id));
            })
        } else {
            setUserOrders(orders?.filter((data) => data?.userId === user?.user_id));
        }
    }, [orders])
    return (
        <main className='w-screen min-h-screen flex items-center justify-start flex-col bg-primary'>
            <Header />
            <div className="w-full overflow-x-hidden overflow-y-hidden h-auto flex flex-col items-start justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
                {userOrders?.length > 0 ? (
                    <>
                        {userOrders.map((item, i) => (
                            <OrderData key={i} index={i} data={item} admin={false} />
                        ))}
                    </>
                ) : (
                    <>
                        <h1 className='text-[72px] text-headingColor font-bold'> No Orders Made yet</h1>
                    </>
                )}

            </div>

        </main>
    )
}

export default UserOrders
