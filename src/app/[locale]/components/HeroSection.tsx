
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
import { useEffect , useState} from "react";
import { motion } from "motion/react";
import Slide from "./Slide"
import Video from 'next-video'
import videoDatei from '@/videos/discount-vd.mp4';
import axios from "axios";
import { HR } from "flowbite-react";

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

const HeroSection = () => {
  const t = useTranslations("HeroSection");

  const [heroProduct, setHeroProduct] = useState<Product[]>([]);

  // fetch products data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Product[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
          params: { category: "HeroSection" },
        });
        setHeroProduct(response.data);
      } catch (error) {
        console.log("No Hero section products found", error);
      }
    }
    fetchData();
  }, []);
  
  // Testimonial data
  const testimonialData = [
    {
      id: 0,
      img: "/testimonial/ph-1.webp",
      name: "Natalia Brese",
      position: "fashion_model_&_artist",
      testimonial: "the_service_is_amazing!!",
    },
    {
      id: 1,
      img: "/testimonial/ph-2.webp",
      name: "Thomas Havbe",
      position: "film_maker_&_singer",
      testimonial: "i_would_recommend_it_to_everybody",
    },
    {
      id: 2,
      img: "/testimonial/ph-4.webp",
      name: "Karmen raden",
      position: "ceo_&_founder_invision",
      testimonial: "i_can't_ask_for_more_than_that",
    },
  ];

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
        category: "HeroSection",
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
          <h1 className="flex items-center justify-center gap-4 font-medium text-xl uppercase dark:text-white">
            {t("new_arrival")} <HR className="text-black dark:text-white w-full [2px]" />
          </h1>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] pt-4 place-items-stretch sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
            {heroProduct.map((item, index) => {
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="product-card px-4 border border-gray-200 rounded-xl max-w-[400px]"
                  key={item.id}
                >
                  <Link className="grid h-full" href={`/product/${item.slug}`}>
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
                          {t(item.title_key)}
                        </h3>
                        <p className="text-[#aaa] max-w-[200px] capitalize">
                          {t(item.desc_key)}
                        </p>
                        <span>
                          <Stars currentRating={null} />
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="product-card__price font-bold flex gap-4">
                          <span className="text-blakish dark:text-white">{item.price}{t("$")}</span>
                          <span className="line-through font-normal text-[#aea3a3]">
                            {item.prev_price}{t("$")}
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
        <h2 className="flex items-center justify-center gap-4 font-medium text-3xl uppercase dark:text-white">
          {t("testimonials")} <HR className="text-black dark:text-white w-full h-[2px]" />
        </h2>
        <Slider {...settings} className="w-[100%] rounded-xl pt-4">
          {testimonialData.map((item) => {
            return (
              <Testimonial
                key={item.id}
                name={item.name}
                img={item.img}
                position={t(item.position)}
                testimonial={t(item.testimonial)}
              />
            );
          })}
        </Slider>
        <div className="rounded-2xl grid mt-10">
          <h2 className="flex items-center justify-center gap-4 font-medium text-3xl uppercase dark:text-white">
            {t("demo")} <HR className="text-black dark:text-white w-full h-[2px]" />
          </h2>
          <Video 
            src={videoDatei} 
            style={{ '--media-accent-color':'rgb(151, 79, 218)', '--media-object-fit': 'cover' }}
            className="overflow-hidden rounded-xl pt-4"
          />
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
