import React, { useEffect } from 'react'

import { DataTable, OrderData } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../api';
import { setAllOrders } from '../context/actions/ordersAction';


const DashboardOrders = () => {
    const orders = useSelector((state) => state.orders);
    const dispatch = useDispatch();


    useEffect(() => {
        if (!orders) {
            getAllOrders().then((data) => {
                console.log("orders from dash item", data);
                dispatch(setAllOrders(data))
            })
        }
    }, [])


    return (
        <div className='flex flex-col items-center justify-self-center gap-4 pt-6 w-full'>
            {orders ? (
                <>
                    {orders.map((item, i) => (
                        <OrderData key={i} index={i} data={item} admin={true} />
                    ))}
                </>
            ) : (
                <>
                    <h1 className='text-[72px] text-headingColor font-bold'> No Orders</h1>
                </>
            )}
            {/* <DataTable
                title={"Orders"}
                columns={[

                    { title: 'Id', field: 'created' },
                    { title: 'Amount', field: 'amount' },

                ]}
                data={orders}
                actions={[
                    {
                        icon: "edit",
                        tooltip: "Edit Data",
                        onClick: (event, rowData) => {
                            alert("Do You want to edit Order" + rowData.created)

                        }
                    },
                    {
                        icon: "delete",
                        tooltip: "Delete Data",
                        onClick: (event, rowData) => {
                            // alert("Do You want to delete  " + rowData.product_name)
                            let isExecuted = window.confirm("Are you sure you want to delete Order" + rowData.created);
                            if (isExecuted) {
                                console.log("delete order")
                                // deleteAProduct(rowData.productId).then(() => {
                                //     dispatch(alertInfo("Product Deleted"));
                                //     setInterval(() => {
                                //         dispatch(alertNULL())
                                //     }, 3000)
                                //     getAllProducts().then((data) => {
                                //         console.log("products from add product", data);
                                //         dispatch(setAllProducts(data));
                                //     });
                                // })
                            }

                            console.log(isExecuted);
                        }
                    },

                ]}

            /> */}
        </div>
    )
}

export default DashboardOrders
