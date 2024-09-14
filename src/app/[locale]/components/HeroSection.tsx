// import React from 'react'

"use client"; // notice; not including the use client will throw a server error because of using the Slider effect in it ,

import Link from "next/link";
import Navbar from "./Navbar";

import Slider from "react-slick"; // slide effect package
import Slide from "./Slide";
import Testimonial from "./Testimonial";
import { useTranslations } from "next-intl";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from "next/image";
import Stars from "./Stars";
import { ShoppingCartSimple } from "@phosphor-icons/react/dist/ssr";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../redux/store";
import { updateCart } from "../redux/features/cart-slice";
import { useEffect } from "react";

interface Product {
  id: number;
  title: string;
  desc: string;
  img: string;
  price: number;
  prevPrice: number;
}

interface cartItems {
  id: number;
  title: string;
  desc: string;
  img: string;
  price: number;
  prevPrice: number;
  quantity: number;
}

const HeroSection = () => {
  const t = useTranslations("Index");

  // slide data
  const slideData = [
    {
      id: 0,
      title: `${t("trending_item")}`,
      img: "/assets/Shop-1.jpg",
      price: "$20",
      desc: `${t("men_sunglasses")}`,
    },
    {
      id: 1,
      title: `${t("new_fashion_summer_sale")}`,
      img: "/assets/Shop-2.jpg",
      price: "$20",
      desc: `${t("women_latest_fashion")}`,
    },
    {
      id: 2,
      title: `${t("trending_earring")}`,
      img: "/assets/Shop-3.jpg",
      price: "$20",
      desc: `${t("women_latest_fashion_sale")}`,
    },
    {
      id: 3,
      title: `${t("modern_nails_design")}`,
      img: "/assets/Shop-4.jpg",
      price: "$20",
      desc: `${t("women_latest_design")}`,
    },
  ];

  // products data
  const products: Product[] = [
    {
      id: 0,
      img: "/products/product-1.jpg",
      title: `${t("jacket")}`,
      desc: `${t("greyman_jacket_heliko_tex")}`,
      price: 45,
      prevPrice: 95,
    },
    {
      id: 1,
      img: "/products/product-2.jpg",
      title: `${t("skirt")}`,
      desc: `${t("brown_floral_wrap_midi_skirt")}`,
      price: 55,
      prevPrice: 105,
    },
    {
      id: 2,
      img: "/products/product-3.jpg",
      title: ` ${t("party_wear")}`,
      desc: `${t("women_party_shoes")}`,
      price: 25,
      prevPrice: 75,
    },
    {
      id: 3,
      img: "/products/product-4.jpg",
      title: `${t("shirt")}`,
      desc: `${t("men_corporate_shirt")}`,
      price: 45,
      prevPrice: 95,
    },
    {
      id: 4,
      img: "/products/product-5.jpg",
      title: `${t("shoes")}`,
      desc: `${t("green_waterproof_hiking_shoes")}`,
      price: 100,
      prevPrice: 107,
    },
    {
      id: 5,
      img: "/products/product-6.jpg",
      title: `${t("watches")}`,
      desc: `${t("smart_watches_vital_plus")}`,
      price: 100,
      prevPrice: 150,
    },
    {
      id: 6,
      img: "/products/product-7.jpg",
      title: `${t("watches")}`,
      desc: `${t("pocket_watch_leather_pouch")}`,
      price: 120,
      prevPrice: 170,
    },
  ];

  // Testimonial data
  const testimonialData = [
    {
      id: 0,
      img: "/testimonial/ph-1.jpg",
      name: "Natalia Brese",
      position: `${t("fashion_model_&_artist")}`,
      testimonial: `${t("the_service_is_amazing!!")}`,
    },
    {
      id: 1,
      img: "/testimonial/ph-2.jpg",
      name: "Thomas Havbe",
      position: `${t("film_maker_&_singer")}`,
      testimonial: `${t("i_would_recommend_it_to_everybody")}`,
    },
    {
      id: 2,
      img: "/testimonial/ph-4.jpg",
      name: "Karmen raden",
      position: `${t("ceo_&_founder_invision")}`,
      testimonial: `${t("i_can't_ask_for_more_than_that")}`,
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

    console.log("Add to cart");
  };

  useEffect(() => {
    console.log("cartArray", cartArray);
  }, [cartArray]);

  // slider settings
  const settings = {
    dots: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 2000,
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div>
        <Navbar />
      </div>

      {/* main HOME content*/}
      <main>
        {/** Slider container */}
        <div className="container">
          <Slider {...settings}>
            {slideData.map((item) => (
              <Slide
                key={item.id}
                title={item.title}
                img={item.img}
                desc={item.desc}
                price={item.price}
              />
            ))}
          </Slider>
        </div>
      </main>

      {/** HOME Products container */}
      <article>
        <div className="container pt-16">
          <h1 className="font-medium pb-4 text-3xl capitalize dark:text-white">
            {t("new_arrival")}
          </h1>
          <div className="grid grid-cols-1  place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
            {products.map((item) => {
              return (
                <div
                  className="product-card px-4 border border-gray-200 rounded-xl max-w-[400px]"
                  key={item.id}
                >
                  <div className="overflow-hidden">
                    <Image
                      src={item.img}
                      alt="product-img"
                      property="false"
                      width={200}
                      height={200}
                      className="bg-transparent w-full object-cover object-center rounded-lg mb-10 cursor-pointer transition duration-500 hover:scale-110"
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
                        <span className="text-blakish dark:text-white">{item.price}.00{t("$")}</span>
                        <span className="line-through font-normal text-[#aea3a3]">
                          {item.prevPrice}.00{t("$")}
                        </span>
                      </div>
                      <button
                        type="submit"
                        className="cursor-pointer hover:text-accent p-2 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                        onClick={() => addToCart(item)}
                      >
                        <ShoppingCartSimple size={32}  className="dark:bg-[#131927] dark:text-white hover:text-accent"/>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </article>

      {/** Testimonial */}
      <div className="container pt-6 grid-cols-2">
        <h2 className="pb-4 font-medium text-3xl capitalize dark:text-white">
          {t("testimonials")}
        </h2>
        <Slider {...settings} className="w-[100%]">
          {testimonialData.map((item) => {
            return (
              <Testimonial
                key={item.id}
                name={item.name}
                img={item.img}
                position={item.position}
                testimonial={item.testimonial}
              />
            );
          })}
        </Slider>
        <div className="bg-[url(/assets/banner.jpg)] bg-bottom sm:bg-cover h-[500px] rounded-2xl grid place-items-center mt-10">
          <div className=" text-center lg:space-y-4 bg-[#ff7a1aa2] min-w-[270px] sm:min-w-[300px] py-9 sm:px-9 md:min-w-[500px]  rounded-lg sm:rounded-none">
            <Link href={`/discount`}>
              <button
                type="button"
                className=" bg-blakish p-4 capitalize rounded-lg text-white"
              >
                {t("25%_discount")}
              </button>
            </Link>

            <p className="font-extrabold text-2xl text-blakish uppercase">
              {t("sommer_collection")}
            </p>
            <p className="text-gray-500 text-[20px]">
              {t("starting_@_$20_shop_now")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
