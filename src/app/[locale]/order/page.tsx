"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Trash } from "@phosphor-icons/react/dist/ssr";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../redux/store";

import { updateCart } from "../redux/features/cart-slice";
import Stars from "../components/Stars";
import { motion } from "motion/react";
import axios from "axios";

interface cartItems {
  id: number;
  slug: string;
  title_key: string;
  desc_key: string;
  category: string;
  img: string;
  price: number;
  prev_price: number | null;
  quantity: number;
}

const Product: React.FC = () => {
  const t = useTranslations("");
  const tOrder = useTranslations("tOrder");

  const [cartItems, setCartItems] = useState<cartItems[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const cartArray: cartItems[] = useAppSelector((state) => state.cartReducer);


  useEffect(() => {
    setCartItems(cartArray);
  }, [cartArray]);

  // item increment function
  const incrementCartItems = (index: number) => {
    // old data
    // increment quantity of that item
    // update cart state in redux
    let tempCartItems = cartArray.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item
    );
    dispatch(updateCart(tempCartItems));
  };

  // item decrement function
  const decrementCartItems = (index: number) => {
    // old data
    // let the quantity of that item if the item is only one single item
    // update cart state in redux
    let tempCartItems = cartArray.map((item, i) =>
      i === index && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    dispatch(updateCart(tempCartItems));
  };

  // item delete fucntion
  const removeCartItems = (index: number) => {
    let tempCartItems = [...cartArray];
    tempCartItems.splice(index, 1);
    dispatch(updateCart(tempCartItems));
  };

  // cart total price
  const total = cartItems.reduce((acc, item) => {
    return acc + item.price * (item.quantity as number);
  }, 0);

  // fecth stored data to be sent to the server
const handleCheckout = async () => {
  const retrievedKeys = cartItems.map((cartItem => {
     return { slug: cartItem.slug, quantity: cartItem.quantity };
  }));
  try {
   const request =  axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/checkout-session`, { items: retrievedKeys });
    console.log(request);
  } catch (error) {
    console.log("no request is sent", error);
  }
};

  return (
    <div className="pt-[160px] max-w-[1536px] mx-auto">
      {cartItems.length !== 0 ? (
        <h1 className="text-center mb-10 capitalize font-bold text-3xl dark:text-white">{tOrder("your_orders")}</h1>
      ) : (
        ""
      )}
      {cartItems.length === 0 ? (
        <h1 className="flex justify-center items-center text-center uppercase sm:text-4xl text-base h-[70vh] dark:text-white">
          {tOrder("Cart_is_empty_please_add_an_item")}
        </h1>
      ) : null}
      <div className="flex flex-col gap-4">
        {cartItems.map((item, index) => {
          return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={index}
                className="flex gap-4 border-blue-500 border-separate"
              >
                <div className="product-img">
                  <Image src={item.img} width={200} height={200} alt="image" className="rounded-lg"/>
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-accent font-bold uppercase text-3xl">
                      {item.title_key}
                    </h3>
                    <p className="text-[#aaa] max-w-[200px] capitalize text-lg">
                      {tOrder(`${item.category}.${item.desc_key}`)}
                    </p>
                    <span>
                      <Stars currentRating={null} />
                    </span>
                    <h2 className="font-bold dark:text-white text-4xl mb-2">${item.price * item.quantity}</h2>
                    <div className="flex items-center gap-4 w-fit rounded-xl border-black border-2 border-solid px-2">
                      <button
                        type="button"
                        onClick={() => decrementCartItems(index)}
                        className="bg-accent p-2 rounded-full w-[21px] h-[21px] flex justify-center items-center text-white"
                      >
                        -
                      </button>
                      <span className="dark:text-white">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => incrementCartItems(index)}
                        className="bg-accent p-2 rounded-full w-[21px] h-[21px] flex justify-center items-center text-[#fff]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span 
                  className="flex gap-2 text-xl cursor-pointer uppercase hover:underline hover:text-red-500 transition-all duration-300 ease-in-out"
                  onClick={() => removeCartItems(index)}>
                  {tOrder("delete")}
                    <Trash
                      size={26}
                      className="cursor-pointer hover:text-red-500 dark:text-white"
                    />
                  </span>
                </div>
              </motion.div>
          );
        })}

      </div>
      <div className="flex items-center justify-end mt-4 gap-10 mb-4">
        {cartItems.length !== 0 ? (
          <button 
          type="button"  
          onClick={handleCheckout}
          className="bg-accent text-[#fff] text-xl hover:bg-purple-400 transition-colors duration-300 ease-in-out py-3 px-7 rounded-full">
            {tOrder("buy")}
          </button>
        ) : (
          ""
        )}
        {cartItems.length !== 0 ? (
          <p className="capitalize text-accent text-2xl font-bold">{tOrder("total_items")}: <span className="text-2xl font-bold text-black">{cartItems.length}</span></p>
        ) : (
          ""
        )}
        <div className="flex items-center gap-4">
          <p className="text-accent text-2xl font-bold">Total :</p>
          <span className="text-2xl font-bold">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
