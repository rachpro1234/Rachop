'use client'

import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { ShoppingCartSimple } from "@phosphor-icons/react/dist/ssr";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { updateCart } from "../../redux/features/cart-slice";

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

const ProductPage = ({ params }: { params: { slug: string } }) => {
  const t = useTranslations("Index");

    // products data
  const products: Product[] = [
    {
      id: 0,
      img: "/products/product-1.webp",
      title: `${t("jacket")}`,
      slug: `${t("jacket")}`,
      desc: `${t("greyman_jacket_heliko_tex")}`,
      price: 45,
      prevPrice: 95,
    },
    {
      id: 1,
      img: "/products/product-2.webp",
      title: `${t("skirt")}`,
      slug: `${t("skirt")}`,
      desc: `${t("brown_floral_wrap_midi_skirt")}`,
      price: 55,
      prevPrice: 105,
    },
    {
      id: 2,
      img: "/products/product-3.webp",
      title: ` ${t("party_wear")}`,
      slug: `${t("party_wear")}`,
      desc: `${t("women_party_shoes")}`,
      price: 25,
      prevPrice: 75,
    },
    {
      id: 3,
      img: "/products/product-4.webp",
      title: `${t("shirt")}`,
      slug: `${t("shirt")}`,
      desc: `${t("men_corporate_shirt")}`,
      price: 45,
      prevPrice: 95,
    },
    {
      id: 4,
      img: "/products/product-5.webp",
      title: `${t("shoes")}`,
      slug: `${t("shoes")}`,
      desc: `${t("green_waterproof_hiking_shoes")}`,
      price: 100,
      prevPrice: 107,
    },
    {
      id: 5,
      img: "/products/product-6.webp",
      title: `${t("watches")}`,
      slug: `${t("watches")}`,
      desc: `${t("smart_watches_vital_plus")}`,
      price: 100,
      prevPrice: 150,
    },
    {
      id: 6,
      img: "/products/product-7.webp",
      title: `${t("watches")}`,
      slug: `${t("watches")}`,
      desc: `${t("pocket_watch_leather_pouch")}`,
      price: 120,
      prevPrice: 170,
    },
  ];

  const { slug } = params;



 const product = products.find((p) => p.id === Number(slug.split("-").pop())); // Extract the ID from the slug and find the product

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
 
  return (
    <article className="flex items-center justify-center pt-[160px]">
          
      <img src={product.img} alt={product.title} />
      <div>
          <p>Product Title: {product.title}</p>
          <p>Product Description: {product.desc}</p>
          <p>Product Price: ${product.price}</p>
          <p>Previous Price: ${product.prevPrice}</p>
          <button
            type="submit"
            aria-label={t("add_to_cart")}
            title={t("add_to_cart")}
            className="cursor-pointer hover:text-accent p-2 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
            onClick={() => addToCart(product)}
          >
            <ShoppingCartSimple size={32}  className="dark:bg-[#131927] dark:text-white hover:text-accent"/>
          </button>
      </div>
    </article>
  );
};

export default ProductPage;