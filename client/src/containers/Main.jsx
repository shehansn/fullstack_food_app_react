import React, { useEffect } from 'react'
import { Header, Home, HomeSlider, FilterSection, Cart } from '../components'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCartItems, getAllProducts } from '../api';
import { setAllProducts } from '../context/actions/productAction';
import { setCartItems } from '../context/actions/cartAction';

const Main = () => {
    const products = useSelector((state) => state.products);
    const user = useSelector((state) => state.user);
    const isCart = useSelector((state) => state.isCart);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!products) {
            getAllProducts().then((data) => {
                console.log("products from main", data);
                dispatch(setAllProducts(data))
            })
        }
        // getAllCartItems(user?.user_id).then((items) => {
        //     console.log("cart items from main", items);
        //     dispatch(setCartItems(items))

        // })
    }, [])

    return (
        <main className='w-screen min-h-screen flex items-center justify-start flex-col bg-primary'>
            <Header />
            <div className="w-full overflow-x-hidden overflow-y-hidden h-auto flex flex-col items-start justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
                <Home />

            </div>
            <div className="w-full h-auto flex flex-col items-start justify-center px-6 md:px-24 2xl:px-96 gap-12 pb-24">

                <HomeSlider />
                <FilterSection />
            </div>
            {isCart && <Cart />}
        </main>
    )
}

export default Main
