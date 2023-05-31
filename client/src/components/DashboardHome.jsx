/* eslint-disable */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../api';
import { setAllProducts } from '../context/actions/productAction';
import { CChart } from '@coreui/react-chartjs'

const DashboardHome = () => {

    const products = useSelector((state) => state.products);
    const dispatch = useDispatch();

    const drinks = products?.filter((item) => (item.product_category === "drinks"));
    const deserts = products?.filter((item) => (item.product_category === "deserts"));
    const fruits = products?.filter((item) => (item.product_category === "fruits"));
    const rice = products?.filter((item) => (item.product_category === "rice"));
    const curry = products?.filter((item) => (item.product_category === "curry"));
    const chinese = products?.filter((item) => (item.product_category === "chinese"));
    const bread = products?.filter((item) => (item.product_category === "bread"));
    const piza = products?.filter((item) => (item.product_category === "piza"));


    useEffect(() => {
        if (!products) {
            getAllProducts().then((data) => {
                console.log("products", data);
                dispatch(setAllProducts(data))
            })
        }
    }, [])

    return (
        <div className='flex items-center justify-center flex-col pt-6 w-full h-full'>
            <div className='grid w-full grid-cols-1 md:grid-cols-2 gap-4 h-full'>
                <div className='w-full h-full flex items-center justify-center'>
                    <div className='w-340 md:w-460'>
                        <CChart
                            type="bar"
                            data={{
                                labels: ['Drinks', 'Deserts', 'Fruits', 'Rice', 'Curry', 'Chinese', 'Bread', 'Piza'],
                                datasets: [
                                    {
                                        label: 'Products Count Category Wise ',
                                        backgroundColor: '#f87979',
                                        data: [drinks?.length, deserts?.length, fruits?.length, rice?.length, curry?.length, chinese?.length, bread?.length, piza?.length],
                                    },
                                ],
                            }}
                            labels="months"
                        />
                    </div>
                </div>
                <div className='w-full h-full flex items-center justify-center'>
                    <div className='w-340 md:w-375'>
                        <CChart
                            type="doughnut"
                            data={{
                                labels: ['Orders', 'Delivered', 'Cancelled', 'Paid', 'Not Paid'],
                                datasets: [
                                    {
                                        backgroundColor: ['#00cc99', '#00b5d4', '#d80700', '#37eb00', '#334e2b'],
                                        data: [40, 20, 5, 10],
                                    },
                                ],
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardHome
