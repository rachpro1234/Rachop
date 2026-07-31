"use client";
import React, { useEffect } from "react";

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

interface cartItems {
  id: number;
  title: string;
  desc_key: string;
  category: string;
  img: string;
  price: number;
  prevPrice: number;
  quantity: number;
}

interface Product {
  id: number;
  slug: string;
  title: string;
  desc_key: string;
  img: string;
  price: number;
  prevPrice: number;
}

function Women() {
  const t = useTranslations("Women");

  const slugify = (text: string) => text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

  const womenProducts = [
    {
      id: 0,
      img: "/womenProducts/w-product1.webp",
      title: "automn-dress",
      desc_key: "green_occasions_dress",
      slug: slugify("green occasions dress"),
      price: 30,
      prevPrice: 70,
    },
    {
      id: 1,
      title: "sommer-dress",
      img: "/womenProducts/w-product2.webp",
      desc_key: "party_wear_dress",
      slug: slugify("party wear dress"),
      price: 70,
      prevPrice: 120,
    },
    {
      id: 2,
      title: "winter-dress",
      img: "/womenProducts/w-product3.webp",
      desc_key: "snow_wear_dress",
      slug: slugify("snow wear dress"),
      price: 60,
      prevPrice: 90,
    },
    {
      id: 3,
      title: "sport-wear",
      img: "/womenProducts/w-product4.webp",
      desc_key: "sport_top_trikot",
      slug: slugify("sport top trikot"),
      price: 30,
      prevPrice: 50,
    },
    {
      id: 4,
      title: "sport-wear",
      img: "/womenProducts/w-product5.webp",
      desc_key: "sommer_outgoing_wear",
      slug: slugify("sommer outgoing wear"),
      price: 60,
      prevPrice: 90,
    },
    {
      id: 5,
      title: "sommer-wear",
      img: "/womenProducts/w-product6.webp",
      desc_key: "top_sommer_trikot",
      slug: slugify("top sommer trikot"),
      price: 40,
      prevPrice: 60,
    },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const cartArray: cartItems[] = useAppSelector((state) => state.cartReducer);

  const addToCart = (product: Product) => {
    const itemIndex = cartArray.findIndex((item) => item.id === product.id);

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
        title: product.title,
        desc_key: product.desc_key,
        category: "Women",
        img: product.img,
        price: product.price,
        prevPrice: product.prevPrice,
        quantity: 1,
      };

      const updatedCart = [...cartArray, newCartItem];
      dispatch(updateCart(updatedCart));
    }

    // console.log("Add to cart");
  };

  useEffect(() => {
    console.log("cartArray", cartArray);
  }, [cartArray]);

  return (
    <div className="container pt-[160px] relative">
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
        <div className="grid grid-cols-1  place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
          {womenProducts.map((item, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="product-card px-4 border border-gray-200 rounded-xl max-w-[400px]"
                key={item.id}
              >
                <Link href={`/womenProducts/${item.slug}-${item.id}`}>
                  <div className="overflow-hidden">
                    <Image
                      src={item.img}
                      alt="product-img"
                      width={200}
                      height={200}
                      className="bg-transparent w-full object-cover object-center rounded-lg mb-10 cursor-pointer transition duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="product-card__info space-y-2 py-2">
                    <h3 className="text-accent font-bold uppercase">
                      {t(item.title)}
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
                          {item.price}.00{t("$")}
                        </span>
                        <span className="line-through font-normal text-[#aea3a3]">
                          {item.prevPrice}.00{t("$")}
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
