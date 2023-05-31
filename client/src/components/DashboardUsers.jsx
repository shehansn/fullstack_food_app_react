import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../api';
import { setAllUserDetails } from '../context/actions/allUsersAction';
import { DataTable } from '../components';
import { Avatar } from '../assets';

const DashboardUsers = () => {

    const baseURL = "http://127.0.0.1:5001/fullstack-food-app-react/us-central1/app";

    const allUsers = useSelector((state) => state.allUsers);
    const dispatch = useDispatch();

    useEffect(() => {
        // if (allUsers) {
        //     console.log("allusers")
        //     getAllUsers().then((data) => {
        //         console.log("user details from dash user", data);
        //         dispatch(setAllUserDetails(data))
        //     })
        // } else {
        //     console.log("!allusers")
        // }

    }, [])

    return (
        <div className='flex items-center justify-self-center gap-4 pt-6 w-full'>
            <DataTable
                title={"All Users"}
                columns={[
                    {
                        title: "Image",
                        field: "photoURL",
                        render: (rowData) => (
                            <img
                                className='w-32 h-16 object-contain rounded-md'
                                src={rowData.photoURL ? rowData.photoURL : Avatar}
                            />
                        ),
                    },
                    {
                        title: "Name",
                        field: "displayName",
                    },
                    {
                        title: "Email",
                        field: "email",
                    },
                    {
                        title: "Verified",
                        field: "emailVerified",
                        render: (rowData) => (
                            <p className={`px-2 py-2 w-32 text-primary rounded-md ${rowData.emailVerified ? "bg-emerald-500" : "bg-red-500"}`} >
                                {rowData.emailVerified ? "Verified" : "Not Verified"}
                            </p>
                        ),
                    },


                ]}
                //data={allUsers}
                data={query =>
                    new Promise((resolve, reject) => {
                        let url = `${baseURL}/api/users/allUsers?`
                        url += 'per_page=' + query.pageSize
                        url += '&page=' + (query.page + 1)
                        fetch(url)
                            .then(response => response.json())
                            .then(result => {
                                resolve({
                                    data: result.data,
                                    page: result.page - 1,
                                    totalCount: result.total,
                                })
                            })
                    })
                }
                actions={[
                    {
                        icon: "edit",
                        tooltip: "Edit Data",
                        onClick: (event, rowData) => {
                            alert("Do You want to edit " + rowData.displayName)

                        }
                    },
                    {
                        icon: "delete",
                        tooltip: "Delete Data",
                        onClick: (event, rowData) => {
                            // alert("Do You want to delete  " + rowData.product_name)
                            let isExecuted = window.confirm("Are you sure you want to delete " + rowData.displayName);
                            // if (isExecuted) {
                            //     deleteAProduct(rowData.productId).then(() => {
                            //         dispatch(alertInfo("Product Deleted"));
                            //         setInterval(() => {
                            //             dispatch(alertNULL())
                            //         }, 3000)
                            //         getAllProducts().then((data) => {
                            //             console.log("products from add product", data);
                            //             dispatch(setAllProducts(data));
                            //         });
                            //     })
                            // }

                            console.log(isExecuted);
                        }
                    },

                ]}

            />
        </div>
    )
}

export default DashboardUsers
