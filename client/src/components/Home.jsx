import React from 'react'
import { motion } from 'framer-motion'
import { DeliveryBike, HeroBg } from '../assets'
import { sampleData } from '../utils/data'
import { buttonClick, staggerFadeInOut } from '../animations'

const Home = () => {
    return (
        <motion.div className=' w-full grid grid-cols-1 md:grid-cols-2 gap-4 '>
            <div className='flex flex-col items-start justify-center gap-1'>
                <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
                    <p className="text-lg text-orange-500 font-semibold">
                        Free Delivery
                    </p>
                    <div className="w-8 h-8 bg-white items-center justify-center rounded-full overflow-hidden drop-shadow-xl">
                        <img
                            src={DeliveryBike}
                            className="w-full h-full object-contain"
                            alt="delivery"
                        />
                    </div>
                </div>

                <p className="text-[40px] md:text-[54px] font-bold tracking-wide text-headingColor">
                    The Fastest Delivery in
                    <span className="text-orange-600 ">{'  '}
                        Your City
                    </span>
                </p>

                <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima velit
                    eaque fugit distinctio est nam voluptatum architecto, porro iusto
                    deserunt recusandae ipsa minus eos sunt, dolores illo repellat facere
                    suscipit!
                </p>

                <motion.button {...buttonClick}
                    type="button"
                    className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
                >
                    Order Now
                </motion.button>

            </div>
            <div className="flex-1 flex items-center justify-end relative ">
                <img
                    src={HeroBg}
                    className="absolute top-0 right-0 m:-right-12 h-420 w-full md:w-[80%] md:h-420 rounded-lg"
                    alt="hero-bg"
                />

                <div className="w-full md:w-460 md:h-300 ml-0 flex flex-wrap items-center justify-center gap-4 gap-y-14  ">
                    {sampleData &&
                        sampleData.map((data, i) => (
                            <motion.div
                                key={i} {...staggerFadeInOut}
                                className="w-32 h-36 md:h-auto md:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
                            >

                                <img
                                    src={data.imageURL}
                                    className="w-12 h-12 md:w-32 md:h-32 -mt-10 md:-mt-16 object-contain rounded-xl "
                                    alt="product_image"
                                />


                                <p className="text-base lg:text-xl font-semibold text-textColor lg:mt-4">
                                    {data.product_name}
                                </p>
                                <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold ">
                                    {data.product_category}
                                </p>

                                <p className="text-sm font-semibold text-headingColor">
                                    <span className="text-xs text-red-600">$</span> {data.product_price}
                                </p>


                            </motion.div>
                        ))}
                </div>
            </div>

        </motion.div>
    )
}

export default Home
