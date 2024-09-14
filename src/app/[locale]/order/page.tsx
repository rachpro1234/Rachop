"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Trash } from "@phosphor-icons/react/dist/ssr";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../redux/store";

import { updateCart } from "../redux/features/cart-slice";
import Stars from "../components/Stars";

interface cartItems {
  id: number;
  title: string;
  desc: string;
  img: string;
  price: number;
  prevPrice: number;
  quantity: number;
}

const Product: React.FC = () => {
  const t = useTranslations("Order");
  const [cartItems, setCartItems] = useState<cartItems[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const cartArray: cartItems[] = useAppSelector((state) => state.cartReducer);

  // const temptCartItems: cartItems[] = [

  //   {
  //     id: 0,
  //     img: "/products/product-1.jpg",
  //     title: `${t("jacket")}`,
  //     desc: `${t("greyman_jacket_heliko_tex")}`,
  //     price: 45,
  //     prevPrice: 95,
  //     quantity: 1,
  //   },
  //   {
  //     id: 1,
  //     img: "/products/product-2.jpg",
  //     title: `${t("skirt")}`,
  //     desc: `${t("brown_floral_wrap_midi_skirt")}`,
  //     price: 55,
  //     prevPrice: 105,
  //     quantity: 1,
  //   },
  //   {
  //     id: 2,
  //     img: "/products/product-3.jpg",
  //     title: ` ${t("party_wear")}`,
  //     desc: `${t("women_party_shoes")}`,
  //     price: 25,
  //     prevPrice: 75,
  //     quantity: 1,
  //   },
  //   {
  //     id: 3,
  //     img: "/products/product-4.jpg",
  //     title: `${t("shirt")}`,
  //     desc: `${t("men_corporate_shirt")}`,
  //     price: 45,
  //     prevPrice: 95,
  //     quantity: 1,
  //   },
  //   {
  //     id: 4,
  //     img: "/products/product-5.jpg",
  //     title: `${t("shoes")}`,
  //     desc: `${t("green_waterproof_hiking_shoes")}`,
  //     price: 100,
  //     prevPrice: 107,
  //     quantity: 1,
  //   },
  //   {
  //     id: 5,
  //     img: "/products/product-6.jpg",
  //     title: `${t("watches")}`,
  //     desc: `${t("smart_watches_vital_plus")}`,
  //     price: 100,
  //     prevPrice: 150,
  //     quantity: 1,
  //   },
  //   {
  //     id: 6,
  //     img: "/products/product-7.jpg",
  //     title: `${t("watches")}`,
  //     desc: `${t("pocket_watch_leather_pouch")}`,
  //     price: 120,
  //     prevPrice: 170,
  //     quantity: 1,
  //   },
  // ];

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

  return (
    <div className="pt-4">
      {cartItems.length !== 0 ? (
        <h1 className="text-center mb-10 capitalize font-bold text-3xl dark:text-white">{t("your_orders")}</h1>
      ) : (
        ""
      )}
      {cartItems.length === 0 ? (
        <h1 className="flex justify-center items-center text-center uppercase sm:text-4xl text-base h-[70vh] dark:text-white">
          {t("Cart_is_empty_please_add_an_item")}
        </h1>
      ) : null}
      <div className="flex flex-col gap-4">
        {cartItems.map((item, index) => {
          return (
            <div
              key={index}
              className="md:flex md:justify-around flex  items-center gap-4 border-blue-500 border-separate"
            >
              <div className="product-img">
                <Image src={item.img} width={200} height={200} alt="image" className="rounded-lg"/>
              </div>
              <div className="md:flex gap-4 justify-center items-center">
                <h3 className="text-accent font-bold uppercase">
                  {item.title}
                </h3>
                <p className="text-[#aaa] max-w-[200px] capitalize">
                  {item.desc}
                </p>
                <span>
                  <Stars currentRating={null} />
                </span>
                <h2 className="font-bold dark:text-white">{item.price * item.quantity}$</h2>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => decrementCartItems(index)}
                    className="bg-purple-600 p-2 rounded-full w-[21px] h-[21px] flex justify-center items-center text-[#fff]"
                  >
                    -
                  </button>
                  <span className="dark:text-white">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => incrementCartItems(index)}
                    className="bg-purple-600 p-2 rounded-full w-[21px] h-[21px] flex justify-center items-center text-[#fff]"
                  >
                    +
                  </button>
                  <Trash
                    size={32}
                    onClick={() => removeCartItems(index)}
                    className="cursor-pointer hover:text-accent dark:text-white"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center mt-4 gap-10 mb-4">
        {cartItems.length !== 0 ? (
          <button type="button"  className="bg-purple-700 text-[#fff] px-4">
            {t("buy")}
          </button>
        ) : (
          ""
        )}
        {cartItems.length !== 0 ? (
          <span className="capitalize text-accent font-bold">{t("total_items")}: {cartItems.length}</span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Product;
