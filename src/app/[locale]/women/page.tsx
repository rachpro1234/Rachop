"use client";
import React, { useEffect, useState } from "react";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import banner from "/public/womenProducts/banner.webp";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../redux/store";
import { updateCart } from "../redux/features/cart-slice";
import { ShoppingCartSimple } from "@phosphor-icons/react";
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

interface Product {
  id: number;
  slug: string;
  title_key: string;
  desc_key: string;
  img: string;
  price: number;
  prev_price: number;
  createdAt: string;
}

function Women() {
  const t = useTranslations("Women");

  const [womenProducts, setWomenProducts] = useState<Product[]>([]);


  // fetch women data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Product[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
          params: { category: "Women" },
        });
       setWomenProducts(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log("no women products are found", error);
      }
    };
    fetchData()
  }, []);


  const dispatch = useDispatch<AppDispatch>();
  const cartArray: cartItems[] = useAppSelector((state) => state.cartReducer);

  const addToCart = (product: Product) => {
    const itemIndex = cartArray.findIndex((item) => item.slug === product.slug);

    if (itemIndex !== -1) {
      const updatedCart = cartArray.map((item, index) => {
        return index === itemIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      });

      dispatch(updateCart(updatedCart));
    } else {
      const newCartItem = {
        id: product.id,
        slug: product.slug,
        title_key: product.title_key,
        desc_key: product.desc_key,
        category: "Women",
        img: product.img,
        price: product.price,
        prev_price: product.prev_price,
        quantity: 1,
      };

      const updatedCart = [...cartArray, newCartItem];
      dispatch(updateCart(updatedCart));
    }

    // console.log("Add to cart");
  };

  useEffect(() => {
    // console.log("cartArray", cartArray);
  }, [cartArray]);

  return (
    <div className="container pt-[135px] relative">
      <h1 className="text-7xl flex items-center justify-center capitalize absolute text-white ml-4">
        {t("women")}
      </h1>
      <Image
        src={banner}
        width={900}
        height={900}
        property="false"
        className="w-[100%] h-[500px] object-cover sm:object-right object-center rounded-lg"
        alt="men-banner"
      />

      <h1 className="flex items-center justify-center font-bold capitalize text-4xl pt-9 dark:text-white">
        {t("shop_with_us")}
      </h1>

      <div className="pt-14">
        <div className="grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
          {womenProducts.map((item, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="product-card px-4 dark:bg-slate-950 bg-white rounded-xl max-w-[400px]"
                key={item.id}
              >
                <Link href={`/womenProducts/${item.slug}`}>
                  <div className="overflow-hidden">
                    <Image
                      src={item.img}
                      alt="product-img"
                      width={200}
                      height={200}
                      className="bg-transparent w-full object-cover object-center rounded-lg mb-10 cursor-pointer transition duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="product-card__info space-y-2 p-2">
                    <h3 className="text-accent font-bold uppercase">
                      {t(item.title_key)}
                    </h3>
                    <p className="text-[#aaa] max-w-[200px] capitalize">
                      {t(item.desc_key)}
                    </p>
                    <span>
                      <Stars currentRating={null} />
                    </span>
                    <div className="flex justify-between items-center">
                      <div className="product-card__price font-bold flex gap-4">
                        <span className="dark:text-white">
                          {item.price}{t("$")}
                        </span>
                        <span className="line-through font-normal text-[#aea3a3]">
                          {item.prev_price}{t("$")}
                        </span>
                      </div>
                      <button
                        type="submit"
                        aria-label={t("add_to_cart")}
                        title={t("add_to_cart")}
                        className="cursor-pointer hover:text-accent p-2 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                      >
                        <ShoppingCartSimple
                          size={32}
                          onClick={() => addToCart(item)}
                          className="dark:bg-[#131927] dark:text-white hover:text-accent"
                        />
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Women;
