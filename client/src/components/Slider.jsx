import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from 'react-redux';

// Import Swiper styles
import "swiper/css";
import '../assets/css/swiperStyles.css';
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper";
import { SliderCard } from '../components'

const Slider = () => {

    const products = useSelector((state) => state.products);
    const [fruits, setFruits] = useState(null);

    useEffect(() => {
        if (products) {
            const filteredFruits = products?.filter(item => item.product_category === "fruits");
            setFruits(filteredFruits)
            console.log("fruits", fruits);
        }

    }, [products]);



    return (
        <div className='w-full pt-24'>
            <Swiper
                slidesPerView={4}
                centeredSlides={false}
                spaceBetween={30}
                grabCursor={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {fruits && fruits.map((data, i) =>
                    <SwiperSlide key={i}><SliderCard key={i} data={data} index={i} /></SwiperSlide>
                )}


            </Swiper>

        </div>
    )
}

export default Slider
