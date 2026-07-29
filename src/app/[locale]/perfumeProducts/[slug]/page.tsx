'use client'

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { ShoppingCartSimple } from "@phosphor-icons/react/dist/ssr";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { updateCart } from "../../redux/features/cart-slice";
import Stars from "../../components/Stars";
import ImageEffect from "@/src/app/[locale]/components/ImageEffect"
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";

interface Product {
  id: number;
  slug: string;
  title: string;
  desc_key: string;
  img: string;
  price: number;
  prevPrice: number;
}

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

const ProductPage = ({ params }: { params: { slug: string } }) => {
  const t = useTranslations("Jewellery");

    // products data
    const perfumeProducts: Product[] = [
    {
      id: 0,
      img: "/perfume/pro1.webp",
      title: "aqua alleguria",
      desc_key: "winter_perfume",
      slug: t("winter_perfume"),
      price: 30,
      prevPrice: 50,
    },
    {
      id: 1,
      img: "/perfume/pro2.webp",
      title: "park avenue",
      desc_key: "eau de parfum",
      slug: t("winter_perfume"),
      price: 60,
      prevPrice: 100,
    },
    {
      id: 2,
      img: "/perfume/pro3.webp",
      title: "poeme",
      desc_key: "lancome",
      slug: t("winter_perfume"),
      price: 50,
      prevPrice: 90,
    },
    {
      id: 3,
      img: "/perfume/pro4.webp",
      title: "eaudemoiselle",
      desc_key: "de givenchy",
      slug: t("winter_perfume"),
      price: 100,
      prevPrice: 140,
    },
    {
      id: 4,
      img: "/perfume/pro5.webp",
      title: "jeanne lanvin",
      desc_key: "automn_perfume",
      slug: t("winter_perfume"),
      price: 70,
      prevPrice: 120,
    },
    {
      id: 5,
      img: "/perfume/pro6.webp",
      title: "aqua alleguria",
      desc_key: "daily_perfume",
      slug: t("winter_perfume"),
      price: 40,
      prevPrice: 60,
    },
  ];

  const { slug } = params;



 const product = perfumeProducts.find((p) => p.id === Number(slug.split("-").pop())); // Extract the ID from the slug and find the product

 if(!product) {
  notFound();
 }

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
    <section>
      <div className="mt-28 mx-auto max-w-[1265px]">
          <Breadcrumb aria-label="Default breadcrumb example">
            <BreadcrumbItem href="/" className="hover:underline transition-all duration-300 ease-in-out">
              Home
            </BreadcrumbItem>
             <BreadcrumbItem href="" className="hover:underline transition-all duration-300 ease-in-out">{slug}</BreadcrumbItem>
          {/* <BreadcrumbItem>Flowbite React</BreadcrumbItem> */}
          </Breadcrumb>
      </div>
      <article className="flex items-center justify-center gap-7 py-7">
        {/* <img className="w-[700px]" src={product.img} alt={product.title} /> */}
        <ImageEffect image={product.img} />
        <div>
            <h1 className="text-3xl font-bold text-accent uppercase">{product.title}</h1>
            <p className="text-xl capitalize">{t(product.desc_key)}</p>
            <span>
                <Stars currentRating={null} />
            </span>
            <div className="flex justify-between gap-4 mt-4">
              <span className="flex items-center gap-2">
                <p className="text-blakish dark:text-white text-4xl font-bold">${product.price}</p>
                <p className="line-through text-[#aea3a3]">${product.prevPrice}</p>
              </span>
              {/* <button
                type="submit"
                aria-label={t("add_to_cart")}
                title={t("add_to_cart")}
                className="cursor-pointer hover:text-accent p-2 rounded-full transition ease-in-out delay-150 duration-300"
                onClick={() => addToCart(product)}
              >
                <ShoppingCartSimple size={32}  className="dark:bg-[#131927] dark:text-white hover:text-accent"/>
              </button> */}
              <button
                type="submit"
                aria-label={t("add_to_cart")}
                title={t("add_to_cart")}
                onClick={() => addToCart(product)}
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