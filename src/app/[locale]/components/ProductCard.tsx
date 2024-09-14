import React, { useEffect } from "react";
import Image from "next/image";
import Stars from "./Stars";
import { ShoppingCartSimple } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Product from "../order/page";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../redux/store";
import { updateCart } from "../redux/features/cart-slice";

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


const ProductCard: React.FC<Product> = ({
  title,
  desc,
  img,
  price,
  prevPrice,
}) => 
  
  
  
  {
 
    const dispatch = useDispatch<AppDispatch>();
    const cartArray:cartItems[] = useAppSelector((state) => state.cartReducer)
    
    
    
      const addToCart = (product: Product) => {
        const itemIndex = cartArray.findIndex((item) => item.id === product.id)
    
        if(itemIndex !== -1) {
            const updatedCart = cartArray.map((item, index) => {
              return (
                index === itemIndex ? {...item, quantity: item.quantity+1} : item
              )
            })
    
            dispatch(updateCart(updatedCart))
        } else {
          const newCartItem  = {
            id: product.id,
            title: product.title,
            desc: product.desc,
            img: product.img,
            price: product.price,
            prevPrice: product.prevPrice,
            quantity: 1
          }
    
          const updatedCart = [...cartArray, newCartItem]
          dispatch(updateCart(updatedCart))
    
        }
    
    
        console.log("Add to cart");
       }
    
    useEffect(() => {
      console.log("cartArray", cartArray)
    }, [cartArray])
    
 
  return (
    <div>
      <div className="product-card px-4 border border-gray-200 rounded-xl max-w-[400px]">
        <div className="overflow-hidden">
          <Image
            src={img}
            alt="product-img"
            width={200}
            height={200}
            className="bg-transparent w-full object-cover object-center rounded-lg mb-10 cursor-pointer transition duration-500 hover:scale-110"
          />
        </div>
        <div className="product-card__info space-y-2 py-2">
          <h3 className="text-accent font-bold uppercase">{title}</h3>
          <p className="text-[#aaa] max-w-[200px] capitalize">{desc}</p>
          <span>
            <Stars currentRating={null} />
          </span>
          <div className="flex justify-between items-center">
            <div className="product-card__price font-bold flex gap-4">
              <span>{price}.00$</span>
              <span className="line-through font-normal text-[#aea3a3]">
                {prevPrice}.00$
              </span>
            </div>
            <Link href="/order">
              <button
                type="submit"
                className="cursor-pointer hover:text-accent p-2 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                // onClick={() => checkProducts}
              >
                <ShoppingCartSimple size={32} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

