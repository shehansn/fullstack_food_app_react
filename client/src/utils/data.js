import {
    ChickenKebab,
    Icecream1,
    PrownsDish,
    Strawberry,
    i5, f3, d7, cu2

} from '../assets'

export const categories = [
    { id: 1, title: "Drinks", category: "drinks" },
    { id: 2, title: "Deserts", category: "deserts" },
    { id: 3, title: "Fruits", category: "fruits" },
    { id: 4, title: "Rice", category: "rice" },
    { id: 5, title: "Curry", category: "curry" },
    { id: 6, title: "Chinese", category: "chinese" },
    { id: 7, title: "Bread", category: "bread" },
    { id: 8, title: "Piza", category: "piza" },

]



export const sampleData = [
    {
        //imageURL: "https://firebasestorage.googleapis.com/v0/b/fullstack-food-app-react.appspot.com/o/itemImages%2F1685204171240_icecream_cup.jpeg?alt=media&token=b1182cbb-3701-470c-81b2-1a5b880308e0",
        imageURL: i5,
        productId: 1685204181555,
        product_category: "deserts",
        product_name: "Ice-Cream",
        product_price: "200"
    },
    {
        //imageURL: "https://firebasestorage.googleapis.com/v0/b/fullstack-food-app-react.appspot.com/o/itemImages%2F1685208789911_chicken_dish.jpeg?alt=media&token=3ca9171a-a209-4aa5-916a-8f39cc9cfc45",
        imageURL: f3,
        productId: 1685208801196,
        product_category: "curry",
        product_name: "Chicken Dish",
        product_price: "600",
    },
    {
        //imageURL: "https://firebasestorage.googleapis.com/v0/b/fullstack-food-app-react.appspot.com/o/itemImages%2F1685288815262_chineese_chicken_dish.jpeg?alt=media&token=0be769b6-b4d6-441e-a864-6fd494bd3d96",
        imageURL: d7,
        productId: 1685288824987,
        product_category: "chinese",
        product_name: "Chineese Chicken Dish",
        product_price: "450",
    },
    {
        // imageURL: "https://firebasestorage.googleapis.com/v0/b/fullstack-food-app-react.appspot.com/o/itemImages%2F1685289733613_pork_curry.jpeg?alt=media&token=6361cb2c-2bf7-4b70-9683-4cf06f1f2a8e",
        imageURL: cu2,
        productId: 1685289741564,
        product_category: "curry",
        product_name: "Pork Curry Dish",
        product_price: "450",
    },
];

export const categories2 = [
    {
        id: 1,
        name: "Chicken",
        urlParamName: "chicken",
    },
    {
        id: 2,
        name: "Curry",
        urlParamName: "curry",
    },
    {
        id: 3,
        name: "Rice",
        urlParamName: "rice",
    },
    {
        id: 4,
        name: "Fish",
        urlParamName: "fish",
    },
    {
        id: 5,
        name: "Fruits",
        urlParamName: "fruits",
    },
    {
        id: 6,
        name: "Icecreams",
        urlParamName: "icecreams",
    },

    {
        id: 7,
        name: "Soft Drinks",
        urlParamName: "drinks",
    },
];
