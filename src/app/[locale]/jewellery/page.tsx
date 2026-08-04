"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import banner from "/public/jewellery/banner.webp";
import Stars from "../components/Stars";
import { ShoppingCartSimple } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { updateCart } from "../redux/features/cart-slice";
import { AppDispatch, useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { motion } from "motion/react";
import axios from "axios";


interface Product {
  id: number;
  title_key: string;
  desc_key: string;
  slug: string;
  img: string;
  price: number;
  prev_price: number;
  createdAt: string;
}

interface cartItems {
  id: number;
  title_key: string;
  desc_key: string;
  category: string;
  img: string;
  price: number;
  prev_price: number;
  quantity: number;
}


function Jewellery() {
  const t = useTranslations("Jewellery");

  const slugify = (text: string) => text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

  const [jewelleryProducts, setJewelleryProducts] = useState<Product[]>([]);

  // const jewelleryItems = [
  //   {
  //     id: 0,
  //     img: "/jewellery/p1.webp",
  //     title: "o-collier",
  //     desc_key: "occasion_collier",
  //     slug: slugify("occasion collier"),
  //     price: 400,
  //     prevPrice: 600,
  //   },
  //   {
  //     id: 1,
  //     img: "/jewellery/p2.webp",
  //     title: "f-d-necklace",
  //     desc_key: "festival_day_necklace",
  //     slug: slugify("festival day necklace"),
  //     price: 400,
  //     prevPrice: 600,
  //   },
  //   {
  //     id: 2,
  //     img: "/jewellery/p3.webp",
  //     title: "h-necklace",
  //     desc_key: "holiday_necklace",
  //     slug: slugify("holiday necklace"),
  //     price: 400,
  //     prevPrice: 600,
  //   },
  //   {
  //     id: 3,
  //     img: "/jewellery/pr4.webp",
  //     title: "f-e-necklace",
  //     desc_key: "formal_evening_necklace",
  //     slug: slugify("formal evening necklace"),
  //     price: 400,
  //     prevPrice: 600,
  //   },
  //   {
  //     id: 4,
  //     img: "/jewellery/p5.webp",
  //     title: "c-d-necklace",
  //     desc_key: "casual_daily_necklace",
  //     slug: slugify("casual daily necklace"),
  //     price: 400,
  //     prevPrice: 600,
  //   },
  //   {
  //     id: 5,
  //     img: "/jewellery/p6.webp",
  //     title: "w-collier",
  //     desc_key: "wedding_collier",
  //     slug: slugify("wedding collier"),
  //     price: 400,
  //     prevPrice: 600,
  //   },
  // ];


  // fetch Jewellery Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Product[]>("http://localhost:5000/api/products", {
          params: { category: "Jewellery" }
        })
        setJewelleryProducts(response.data);
        console.log("jewellery data: ", response.data);
      } catch (error) {
        console.log("No data found for the category: ", error);
      }
    }

    fetchData();
  }, [])

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
        title_key: product.title_key,
        desc_key: product.desc_key,
        category: "Jewellery",
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
    console.log("cartArray", cartArray);
  }, [cartArray]);

  return (
    <div className="container relative pt-[160px]">
      <h1 className="text-7xl flex items-center justify-center capitalize absolute text-white ml-4">
        {t("jewellery")}
      </h1>

      <div>
        <Image
          src={banner}
          width={1000}
          height={1000}
          alt="jewellery banner"
          property="false"
          className="w-full h-[505px] object-cover sm:object-right object-center rounded-lg"
        />
      </div>

      <h1 className="flex items-center justify-center font-bold capitalize text-4xl pt-9 dark:text-white">
        {t("shop_with_us")}
      </h1>

      <div className="pt-14">
        <div className="grid grid-cols-1  place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
          {jewelleryProducts.map((item, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="product-card px-4 border border-gray-200 rounded-xl max-w-[400px]"
                key={item.id}
              >
                <Link href={`/jewelleryProducts/${item.slug}-${item.id}`}>
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
                            {item.price}.00{t("$")}
                          </span>
                          <span className="line-through font-normal text-[#aea3a3]">
                            {item.prev_price}.00{t("$")}
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

export default Jewellery;
