'use client'
import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import banner from "/public/perfume/banner.webp";
import { ShoppingCartSimple } from "@phosphor-icons/react/dist/ssr";
import Stars from "../components/Stars";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../redux/store";
import { updateCart } from "../redux/features/cart-slice";
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
  title: string;
  desc_key: string;
  img: string;
  price: number;
  prevPrice: number;
}

function Perfume() {
  const t = useTranslations("Perfume");

  const slugify = (text: string) => text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

  const perfumeItems = [
    {
      id: 0,
      img: "/perfume/pro1.webp",
      title: "aqua alleguria",
      desc_key: "winter_perfume",
      slug: slugify("winter aqua alleguria"),
      price: 30,
      prevPrice: 50,
    },
    {
      id: 1,
      img: "/perfume/pro2.webp",
      title: "park avenue",
      desc_key: "eau de parfum",
      slug: slugify("park avenue"),
      price: 60,
      prevPrice: 100,
    },
    {
      id: 2,
      img: "/perfume/pro3.webp",
      title: "poeme",
      desc_key: "lancome",
      slug: slugify("poeme"),
      price: 50,
      prevPrice: 90,
    },
    {
      id: 3,
      img: "/perfume/pro4.webp",
      title: "eaudemoiselle",
      desc_key: "de givenchy",
      slug: slugify("eaudemoiselle"),
      price: 100,
      prevPrice: 140,
    },
    {
      id: 4,
      img: "/perfume/pro5.webp",
      title: "jeanne lanvin",
      desc_key: "automn_perfume",
      slug: slugify("jeanne lanvin"),
      price: 70,
      prevPrice: 120,
    },
    {
      id: 5,
      img: "/perfume/pro6.webp",
      title: "aqua alleguria",
      desc_key: "daily_perfume",
      slug: slugify("aqua alleguria"),
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
        category: "Perfume",
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
    <div className="container relative pt-[160px]">
        <h1 className="absolute text-[#fff] text-7xl flex items-center justify-center capitalize ml-4">
          {t("perfume")}
        </h1>
      <Image
        src={banner}
        width={900}
        height={900}
        alt="banner"
        property="true"
        className="w-[100%] h-[505px] object-cover sm:object-right object-center rounded-lg"
      />

      <h1 className="flex items-center justify-center font-bold capitalize text-4xl pt-9 dark:text-white">
        {t("shop_with_us")}
      </h1>

      <div className="pt-14">
        <div className="grid grid-cols-1  place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
          {perfumeItems.map((item, index) => {
            return (
              <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="product-card px-4 border border-gray-200 rounded-xl max-w-[400px]" 
              key={item.id}>
                <Link href={`/perfumeProducts/${item.slug}-${item.id}`}>
                    <div className="overflow-hidden">
                      <Image
                        src={item.img}
                        alt="product-img"
                        width={200}
                        height={200}
                        className="img bg-transparent w-full object-cover object-center rounded-lg mb-10 cursor-pointer transition duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="product-card__info space-y-2 py-2">
                      <h3 className="text-accent font-bold uppercase">
                        {item.title}
                      </h3>
                      <p className="text-[#aaa] max-w-[200px] capitalize">
                        {t(item.desc_key)}
                      </p>
                      <span>
                        <Stars currentRating={null} />
                      </span>
                      <div className="flex justify-between items-center">
                        <div className="product-card__price font-bold flex gap-4">
                          <span className="dark:text-white">{item.price}.00{t("$")}</span>
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

export default Perfume;
