import React, { useEffect } from 'react'
import { DataTable } from '../components'
import { useDispatch, useSelector } from 'react-redux';
import { HiCurrencyRupee, MdDelete } from '../assets/icons';
import { IconButton } from '@mui/material';
import { deleteAProduct, getAllProducts } from '../api';
import { setAllProducts } from '../context/actions/productAction';
import { alertInfo, alertNULL } from '../context/actions/alertActions';

const DashboardItems = () => {

    const products = useSelector((state) => state.products);
    const dispatch = useDispatch();


    useEffect(() => {
        if (!products) {
            getAllProducts().then((data) => {
                console.log("products from dash item", data);
                dispatch(setAllProducts(data))
            })
        }
    }, [])

    return (
        <div className='flex items-center justify-self-center gap-4 pt-6 w-full'>
            <DataTable
                title={"Products"}
                columns={[
                    {
                        title: "Image",
                        field: "imageURL",
                        render: (rowData) => (
                            <img
                                className='w-32 h-16 object-contain rounded-md'
                                src={rowData.imageURL}
                            />
                        ),
                    },
                    {
                        title: "Product Name",
                        field: "product_name",
                    },
                    {
                        title: "Category",
                        field: "product_category",
                    },
                    {
                        title: "Price",
                        field: "product_price",
                        render: (rowData) => (
                            <p className='flex text-2xl font-semibold text-textColor items-center justify-center' >
                                {parseFloat(rowData.product_price).toFixed(2)}
                                <span className='text-xl font-bold '> LKR</span>
                            </p>
                        ),
                    },
                    // {
                    //     title: "Actions",
                    //     render: (rowData) => {
                    //         const button = (
                    //             <IconButton
                    //                 color="inherit"
                    //                 onClick={() => {
                    //                     alert("Do you want to delete" + rowData.product_name)
                    //                     console.log("delete");
                    //                 }}
                    //             >
                    //                 <MdDelete />
                    //             </IconButton>
                    //         );
                    //         return button;
                    //     },
                    // }

                ]}
                data={products}
                actions={[
                    {
                        icon: "edit",
                        tooltip: "Edit Data",
                        onClick: (event, rowData) => {
                            alert("Do You want to edit " + rowData.product_name)

                        }
                    },
                    {
                        icon: "delete",
                        tooltip: "Delete Data",
                        onClick: (event, rowData) => {
                            // alert("Do You want to delete  " + rowData.product_name)
                            let isExecuted = window.confirm("Are you sure you want to delete " + rowData.product_name);
                            if (isExecuted) {
                                deleteAProduct(rowData.productId).then(() => {
                                    dispatch(alertInfo("Product Deleted"));
                                    setInterval(() => {
                                        dispatch(alertNULL())
                                    }, 3000)
                                    getAllProducts().then((data) => {
                                        console.log("products from add product", data);
                                        dispatch(setAllProducts(data));
                                    });
                                })
                            }

                            console.log(isExecuted);
                        }
                    },

                ]}

            />

        </div>
    )
}

export default DashboardItems
