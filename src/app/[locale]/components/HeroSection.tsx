
"use client"; 

import Link from "next/link";
import Slider from "react-slick";
// import Testimonial from "./Testimonial";
import { useTranslations } from "next-intl";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Stars from "./Stars";
import { ShoppingCartSimple, Quotes } from "@phosphor-icons/react/dist/ssr";
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

interface Testimonial {
  id: number;
  img: string;
  person_name: string;
  person_position: string;
  person_testimonial: string;
}

const HeroSection = () => {
  const t = useTranslations("Hero");

  const tData = useTranslations("Product")

  const [heroProduct, setHeroProduct] = useState<Product[]>([]);
  const [testimonialData, setTestimonialData] = useState<Testimonial[]>([]);

  
  // fetch products data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Product[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
          params: { category: "hero" },
        });
        setHeroProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("No Hero section products found", error);
      }
    }
    fetchData();
  }, []);

  // retrieve testimonials data
  useEffect(() => {
    const fetchTestimonialsData = async () => {
      try {
        const response = await axios.get<Testimonial[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/testimonials`);
        setTestimonialData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("No Testimonials items found", error);
      }
    }

    fetchTestimonialsData();
  }, [])

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
        category: "hero",
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
          <h1 className="flex items-center justify-center gap-4 font-medium text-2xl border border-accent px-5 whitespace-nowrap rounded-[40px] bg-white dark:bg-[#131927] uppercase dark:text-white">
            {t("new_arrival")} <HR className="text-black dark:text-white w-full h-[2px]" />
          </h1>
          {heroProduct.length > 0 ? <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] pt-10 place-items-stretch sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
            {heroProduct.map((item, index) => {
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="product-card px-4 dark:bg-slate-950 bg-white rounded-xl max-w-[400px] w-full"
                  key={item.id}
                >
                  <Link className="grid" href={`/product/${item.slug}`}>
                    <div className="overflow-hidden">
                      <Image
                        src={item.img}
                        alt="product-img"
                        property="false"
                        width={200}
                        height={200}
                        className="bg-transparent w-full object-cover object-center rounded-lg cursor-pointer transition duration-500 hover:scale-110"
                      />
                    </div>
                  </Link>
                    <div className="product-card__info flex flex-col justify-between p-2">
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
                          <ShoppingCartSimple size={32}  className="dark:text-white hover:text-accent"/>
                        </button>
                      </div>
                    </div>
                </motion.div>
              );
            })}
          </div> : <span className="h-screen flex justify-center items-center text-white">{tData("no_data")}</span> }
        </article>

      {/** Testimonial */}
      <div className="container pt-9 grid-cols-2">
        <h2 className="flex items-center justify-center gap-4 border border-accent px-5 whitespace-nowrap rounded-[40px] bg-white dark:bg-[#131927] font-medium text-2xl uppercase dark:text-white">
          {t("testimonials")} <HR className="text-black dark:text-white w-full h-[2px]" />
        </h2>
        <Slider {...settings} className="w-[100%] rounded-xl pt-10">
          {testimonialData.map((item, index) => {
            return (
                 <div 
                 className="flex items-center relative" 
                 key={index}>
                    <p className="absolute top-0 left-0 w-full h-full m-0 bg-black/50 rounded-xl"></p>
                    <div className="w-[100%]">
                      <Image
                        alt="image"
                        src={item.img}
                        width={2000}
                        height={2000}
                        property="false"
                        className="rounded-xl object-cover sm:object-top-[20%] w-[100%] h-[500px]"
                      /> 
                    </div>
                    <div className="absolute left-[30px] lg:space-y-4 bg-[#ffffffa2] sm:bg-transparent p-6 sm:p-0 rounded-lg sm:rounded-none">
                      <div className="flex-col relative">
                        <h3 className="text-accent font-bold uppercase text-[4rem]">{item.person_name}</h3>
                        <p className="sm:text-[#8b8b8b] text-blakish">{item.person_position}</p>
                        <p className="text-white">
                          <span className="text-accent absolute -left-[5.2%]">
                            <Quotes size={20} weight="fill" />
                          </span>
                          {item.person_testimonial}
                          <span className="text-accent absolute">
                            <Quotes size={20} weight="fill" />
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
              // <Testimonial
              //   key={item.id}
              //   person_name={item.person_name}
              //   img={item.img}
              //   person_position={t(item.person_position)}
              //   person_testimonial={t(item.person_testimonial)}
              // />
            );
          })}
        </Slider>
        <div className="rounded-2xl grid mt-10">
          <h2 className="flex items-center justify-center gap-4 border border-accent px-5 whitespace-nowrap rounded-[40px] bg-white dark:bg-[#131927] font-medium text-3xl uppercase dark:text-white">
            {t("demo")} <HR className="text-black dark:text-white w-full h-[2px]" />
          </h2>
          <Video 
            src={videoDatei} 
            style={{ '--media-accent-color':'rgb(151, 79, 218)', '--media-object-fit': 'cover' }}
            className="overflow-hidden rounded-xl pt-10"
          />
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
