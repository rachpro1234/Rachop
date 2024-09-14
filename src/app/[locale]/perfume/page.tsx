'use client'
import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import banner from "public/perfume/banner.jpg";
import { ShoppingCartSimple } from "@phosphor-icons/react/dist/ssr";
import Stars from "../components/Stars";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../redux/store";
import { updateCart } from "../redux/features/cart-slice";

interface cartItems {
  id: number;
  title: string;
  desc: string;
  img: string;
  price: number;
  prevPrice: number;
  quantity: number;
}

interface Product {
  id: number;
  title: string;
  desc: string;
  img: string;
  price: number;
  prevPrice: number;
}

function Perfume() {
  const t = useTranslations("Perfume");


  const perfumeItems = [
    {
      id: 0,
      img: "/perfume/pro1.jpg",
      title: "aqua alleguria",
      desc: `${t("winter_perfume")}`,
      price: 30,
      prevPrice: 50,
    },
    {
      id: 1,
      img: "/perfume/pro2.jpg",
      title: "park avenue",
      desc: "eau de parfum",
      price: 60,
      prevPrice: 100,
    },
    {
      id: 2,
      img: "/perfume/pro3.jpg",
      title: "poeme",
      desc: "lancome",
      price: 50,
      prevPrice: 90,
    },
    {
      id: 3,
      img: "/perfume/pro4.jpg",
      title: "eaudemoiselle",
      desc: "de givenchy",
      price: 100,
      prevPrice: 140,
    },
    {
      id: 4,
      img: "/perfume/pro5.jpg",
      title: "jeanne lanvin",
      desc: `${t("automn_perfume")}`,
      price: 70,
      prevPrice: 120,
    },
    {
      id: 5,
      img: "/perfume/pro6.jpg",
      title: "aqua alleguria",
      desc: `${t("daily_perfume")}`,
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
        desc: product.desc,
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
    <div className="relative pt-6">
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
          {perfumeItems.map((item) => {
            return (
              <div className="product-card px-4 border border-gray-200 rounded-xl max-w-[400px]" key={item.id}>
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
                    {item.desc}
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Perfume;
