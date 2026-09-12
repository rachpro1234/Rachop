'use client'

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { ShoppingCartSimple } from "@phosphor-icons/react/dist/ssr";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { updateCart } from "../../redux/features/cart-slice";
import Stars from "../../components/Stars";
import ImageEffect from "@/src/app/[locale]/components/ImageEffect"
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import axios from "axios";

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

const ProductPage = ({ params }: { params: { slug: string } }) => {
  const t = useTranslations("Jewellery");

  const [productItem, setProductItem] = useState<Product | null>(null)

  const { slug } = params;

  useEffect(() => {
     if(!slug) return;

    const fetchData = async () => {
      const response = await axios.get<Product>(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`)
       setProductItem(response.data);
    }
    fetchData();
  }, [slug])


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
     }, [cartArray]);


      if(!productItem) {
        return <p className="h-screen flex justify-center items-center">loading...</p>
      }

      if(!productItem) {
        notFound();
      }

 
  return (
    <section className="container">
      <div className="mt-28">
          <Breadcrumb aria-label="Default breadcrumb example">
            <BreadcrumbItem href="/" className="hover:underline transition-all duration-300 ease-in-out">
              Home
            </BreadcrumbItem>
             <BreadcrumbItem href="" className="hover:underline transition-all duration-300 ease-in-out">{slug}</BreadcrumbItem>
          </Breadcrumb>
      </div>
      <article className="flex items-center gap-7 py-7 bg-white dark:bg-dark_primary_bg p-4">
        <ImageEffect image={productItem.img} />
        <div className="flex flex-col justify-between">
          <div>
              <h1 className="text-3xl font-bold text-accent uppercase">{productItem.title_key}</h1>
              <p className="text-xl capitalize dark:text-white">{t(productItem.desc_key)}</p>
              <span>
                  <Stars currentRating={null} />
              </span>
          </div>
            <div className="mt-4">
              <span className="flex items-center gap-2">
                <p className="text-blakish dark:text-white text-4xl font-bold">${productItem.price}</p>
                <p className="line-through text-[#aea3a3]">${productItem.prev_price}</p>
              </span>
              <button
                type="submit"
                aria-label={t("add_to_cart")}
                title={t("add_to_cart")}
                onClick={() => addToCart(productItem)}
                className="relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-black rounded-full bg-gradient-to-t from-[#8122b0] to-[#dc98fd] active:scale-95"
              >
                <span
                  className="w-full h-full capitalize flex items-center gap-2 px-7 py-2 bg-accent text-white rounded-full bg-gradient-to-t from-[#a62ce2] to-accent"
                >
                <ShoppingCartSimple size={20}  className="text-white"/>

                add to cart</span>
              </button>
            </div>

        </div>

      </article>
        {/* thumbnail display test */}
        {/* <div className="w-full h-screen flex items-center justify-center"> */}
          {/* <ThumbnailSlider images={product.images} /> */}
        {/* </div> */}
        {/* <ImageEffect image={product.img} /> */}
    </section>
  );
};

export default ProductPage;