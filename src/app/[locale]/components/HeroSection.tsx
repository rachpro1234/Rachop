
"use client"; 

import Link from "next/link";
import Slider from "react-slick";
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
import { motion } from "motion/react";
import Slide from "./Slide"
import Video from 'next-video'
import videoDatei from '@/videos/discount-vd.mp4';

import { HR } from "flowbite-react";

interface Product {
  id: number;
  slug: string;
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
  // const slideData = [
  //   {
  //     id: 0,
  //     title: `${t("trending_item")}`,
  //     img: "/assets/shop-1.webp",
  //     price: "$20",
  //     desc: `${t("men_sunglasses")}`,
  //   },
  //   {
  //     id: 1,
  //     title: `${t("new_fashion_summer_sale")}`,
  //     img: "/assets/shop-2.webp",
  //     price: "$20",
  //     desc: `${t("women_latest_fashion")}`,
  //   },
  //   {
  //     id: 2,
  //     title: `${t("trending_earring")}`,
  //     img: "/assets/shop-3.webp",
  //     price: "$20",
  //     desc: `${t("women_latest_fashion_sale")}`,
  //   },
  //   {
  //     id: 3,
  //     title: `${t("modern_nails_design")}`,
  //     img: "/assets/shop-4.webp",
  //     price: "$20",
  //     desc: `${t("women_latest_design")}`,
  //   },
  // ];

   // split the slug to get the product ID and find the corresponding product
  const slugify = (text: string) => text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

  // products data
  const products: Product[] = [
    {
      id: 0,
      img: "/products/product-1.webp",
      title: `${t("jacket")}`,
      slug: `${slugify(t("jacket"))}`,
      desc: `${t("greyman_jacket_heliko_tex")}`,
      price: 45,
      prevPrice: 95,
    },
    {
      id: 1,
      img: "/products/product-2.webp",
      title: `${t("skirt")}`,
      slug: `${slugify(t("skirt"))}`,
      desc: `${t("brown_floral_wrap_midi_skirt")}`,
      price: 55,
      prevPrice: 105,
    },
    {
      id: 2,
      img: "/products/product-3.webp",
      title: ` ${t("party_wear")}`,
      slug: `${slugify(t("party_wear"))}`,
      desc: `${t("women_party_shoes")}`,
      price: 25,
      prevPrice: 75,
    },
    {
      id: 3,
      img: "/products/product-4.webp",
      title: `${t("shirt")}`,
      slug: `${slugify(t("shirt"))}`,      
      desc: `${t("men_corporate_shirt")}`,
      price: 45,
      prevPrice: 95,
    },
    {
      id: 4,
      img: "/products/product-5.webp",
      title: `${t("shoes")}`,
      slug: `${slugify(t("shoes"))}`,      
      desc: `${t("green_waterproof_hiking_shoes")}`,
      price: 100,
      prevPrice: 107,
    },
    {
      id: 5,
      img: "/products/product-6.webp",
      title: `${t("watches")}`,
      slug: `${slugify(t("watches"))}`,
      desc: `${t("smart_watches_vital_plus")}`,
      price: 100,
      prevPrice: 150,
    },
    {
      id: 6,
      img: "/products/product-7.webp",
      title: `${t("watches")}`,
      slug: `${slugify(t("watches"))}`,
      desc: `${t("pocket_watch_leather_pouch")}`,
      price: 120,
      prevPrice: 170,
    },
  ];
  
  // Testimonial data
  const testimonialData = [
    {
      id: 0,
      img: "/testimonial/ph-1.webp",
      name: "Natalia Brese",
      position: `${t("fashion_model_&_artist")}`,
      testimonial: `${t("the_service_is_amazing!!")}`,
    },
    {
      id: 1,
      img: "/testimonial/ph-2.webp",
      name: "Thomas Havbe",
      position: `${t("film_maker_&_singer")}`,
      testimonial: `${t("i_would_recommend_it_to_everybody")}`,
    },
    {
      id: 2,
      img: "/testimonial/ph-4.webp",
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

    // console.log("Add to cart");
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
    <main>

      {/* main HOME content*/}
        <Slide />

      {/** HOME Products container */}
        <article className="container pt-16">
          <h1 className="font-medium pb-4 text-3xl capitalize dark:text-white">
            {t("new_arrival")}
          </h1>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))]  place-items-stretch sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
            {products.map((item, index) => {
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="product-card px-4 border border-gray-200 rounded-xl max-w-[400px]"
                  key={item.id}
                >
                  <Link className="grid h-full" href={`/product/${item.slug}-${item.id}`}>
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
                    <div className="product-card__info flex flex-col justify-between">
                      <div>
                        <h3 className="text-accent font-bold uppercase">
                          {item.title}
                        </h3>
                        <p className="text-[#aaa] max-w-[200px] capitalize">
                          {item.desc}
                        </p>
                        <span>
                          <Stars currentRating={null} />
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="product-card__price font-bold flex gap-4">
                          <span className="text-blakish dark:text-white">{item.price}.00{t("$")}</span>
                          <span className="line-through font-normal text-[#aea3a3]">
                            {item.prevPrice}.00{t("$")}
                          </span>
                        </div>
                        <button
                          type="submit"
                          aria-label={t("add_to_cart")}
                          title={t("add_to_cart")}
                          className="cursor-pointer hover:text-accent p-2 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                          onClick={() => addToCart(item)}
                        >
                          <ShoppingCartSimple size={32}  className="dark:bg-[#131927] dark:text-white hover:text-accent"/>
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </article>

      {/** Testimonial */}
      <div className="container pt-9 grid-cols-2">
        <h2 className="flex items-center justify-center gap-4 pb-4 font-medium text-3xl capitalize dark:text-white">
          {t("testimonials")} <HR className="text-black dark:text-white w-full" />
        </h2>
        <Slider {...settings} className="w-[100%] rounded-xl">
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
        <div className="rounded-2xl grid mt-10">
          <h2 className="flex items-center justify-center gap-4 pb-4 font-medium text-3xl capitalize dark:text-white">
            {t("demo")} <HR className="text-black dark:text-white w-full" />
          </h2>
          <Video 
            src={videoDatei} 
            style={{ '--media-accent-color':'rgb(151, 79, 218)', '--media-object-fit': 'cover' }}
            className="overflow-hidden rounded-xl"
          />
          {/* <div className=" text-center lg:space-y-4 bg-[#ff7a1aa2] min-w-[270px] sm:min-w-[300px] py-9 sm:px-9 md:min-w-[500px]  rounded-lg sm:rounded-none">
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
          </div> */}
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
