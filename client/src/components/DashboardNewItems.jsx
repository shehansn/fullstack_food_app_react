import React, { useState } from 'react'
import { categories } from '../utils/data';
import { MainLoader, Spinner } from '../components';
import { FaCloudUploadAlt, MdDelete } from '../assets/icons';
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../config/firebase.config";
import { useDispatch, useSelector } from 'react-redux';

import { alertDanger, alertInfo, alertNULL, alertSuccess, alertWarning } from '../context/actions/alertActions';
import { motion } from 'framer-motion';
import { buttonClick, fadeInOut } from '../animations';
import { LinearProgress } from '@mui/material';
import { addNewProduct, getAllProducts } from '../api';
import { setAllProducts } from '../context/actions/productAction'

const DashboardNewItems = () => {
    const [itemName, setItemName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [progress, setProgress] = useState(null);
    const [imageDownloadURL, setImageDownloadURL] = useState(null);

    const alert = useSelector((state) => state.alert)
    const dispatch = useDispatch();

    const uploadImage = (e) => {
        setIsLoading(true);
        const imageFile = e.target.files[0];
        console.log("file url", imageFile)
        const storageRef = ref(storage, `itemImages/${Date.now()}_${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            },
            (error) => {
                console.log('error ', error);
                dispatch(alertDanger(`Error :${error}`));
                setTimeout(() => {
                    dispatch(alertNULL())
                }, 3000);
            },
            () => {

                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at ', downloadURL);
                    setImageDownloadURL(downloadURL);
                    setIsLoading(false);
                    setProgress(null);
                    dispatch(alertSuccess('Image uploaded Successfully'));
                    setTimeout(() => {
                        dispatch(alertNULL())
                    }, 3000);
                })

            }
        )
    }

    const deleteImageFromFirebase = () => {
        setIsLoading(true);
        const deleteRef = ref(storage, imageDownloadURL)

        deleteObject(deleteRef).then(() => {
            setImageDownloadURL(null)
            setIsLoading(false)
            dispatch(alertWarning('Image Deleted Successfully'));
            setTimeout(() => {
                dispatch(alertNULL())
            }, 3000);
        })


    }

    const submitNewData = () => {
        dispatch(alertInfo("Adding item..."));

        const data = {
            product_name: itemName,
            product_category: category,
            product_price: price,
            imageURL: imageDownloadURL,
        }

        console.log("data from add new item", data);
        addNewProduct(data).then((res) => {
            console.log("response from add new item", res);
            dispatch(alertSuccess('New Item Added Successfully'));
            setTimeout(() => {
                dispatch(alertNULL())
            }, 3000);
            setImageDownloadURL(null)
            setItemName("")
            setPrice("")
            setCategory(null)
        });
        getAllProducts().then((data) => {
            console.log("products from add product", data);
            dispatch(setAllProducts(data));
        });

    }

    return (
        <div className='flex items-center justify-center flex-col pt-6 px-24 w-full'>

            <div className='border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4'>
                <InputValueField type="text" placeHolder={"Item Name Here"} stateFunc={setItemName} stateValue={itemName} />

                <div className='w-full flex items-center justify-around gap-3 flex-wrap'>
                    {categories && categories?.map(data => (
                        <p key={data.id}
                            className={`px-4 py-3 rounded-md text-xl text-textColor font-semibold
                         cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md
                         ${data.category === category ? 'bg-red-300 text-primary' : 'bg-transparent'}
                         `}
                            onClick={() => setCategory(data.category)}
                        >
                            {data.title}
                        </p>
                    ))}
                </div>

                <InputValueField type="number" placeHolder={"Item Price Here"} stateFunc={setPrice} stateValue={price} />

                <div className='w-[70%] bg-card backdrop-blur-md h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer'>
                    {isLoading ?
                        <div className='w-full h-full flex flex-col items-center justify-evenly px-24'>
                            <Spinner />
                            {Math.round(progress > 0) && (
                                <div className='w-full flex flex-col items-center justify-center gap-2'>
                                    <div className='flex justify-between w-full'>
                                        <span className='text-base font-medium text-textColor '>
                                            Progress
                                        </span>
                                        <span className='text-sm font-medium text-textColor'>
                                            {Math.round(progress > 0) && (
                                                <>{`${Math.round(progress)}%`}</>
                                            )}

                                        </span>
                                    </div>
                                    <div className='w-full bg-gray-200 rounded-full h-2.5'>
                                        <div className='bg-green-500 h-2.5 rounded-full transition-all duration-300 ease-in-out'
                                            style={{ width: `${Math.round(progress)}%`, }}
                                        >

                                        </div>
                                    </div>

                                </div>
                            )}
                        </div> :
                        <>
                            {!imageDownloadURL ?
                                <>
                                    <label>
                                        <div className='flex flex-col items-center justify-center h-full w-full cursor-pointer'>
                                            <p className='font-bold text-4xl'>
                                                <FaCloudUploadAlt className='-rotate-0' />
                                            </p>
                                            <p className='text-lg text-textColor'>Click to upload an image</p>
                                        </div>
                                        <input
                                            type='file'
                                            name='upload-image'
                                            accept='image/*'
                                            onChange={uploadImage}
                                            className='w-0 h-0'
                                        />
                                    </label>
                                </>
                                :
                                <>
                                    <div className='relative w-full h-full overflow-hidden rounded-md '>
                                        <motion.img
                                            whileHover={{ scale: 1.15 }}
                                            src={imageDownloadURL}
                                            className='w-full h-full object-cover '
                                        />

                                        <motion.button {...buttonClick}
                                            type='button'
                                            className='absolute top-3 right-3 p-3 rounded-full bg-black text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out'
                                            onClick={() => deleteImageFromFirebase(imageDownloadURL)}
                                        >
                                            <MdDelete className='-rotate-0 text-white' />
                                        </motion.button>
                                    </div>
                                </>
                            }
                        </>
                    }

                </div>
                <motion.button {...buttonClick} onClick={submitNewData} className='w-[70%] py-2 rounded-md bg-green-400 text-primary hover:bg-green-700 cursor-pointer'>
                    Save Item
                </motion.button>

            </div>


        </div>
    )

}

export const InputValueField = ({ type, placeHolder, stateValue, stateFunc }) => {
    return <>

        <input
            type={type}
            required
            placeholder={placeHolder}
            value={stateValue}
            onChange={(e) => stateFunc(e.target.value)}
            className="w-full h-12 text-lg bg-cardOverlay outline-none border border-gray-200 shadow-md focus:border-green-500 placeholder:text-gray-400 text-textColor p-2 rounded-sm"
        />
    </>

}

export default DashboardNewItems
