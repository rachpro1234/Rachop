'use client'

import CheckoutRender from "@/lib/stripe";
import { useAppSelector } from "../redux/store";


export default function Checkout() {

      const clientSec = useAppSelector((state) => state.checkoutReducer); // checkout

        if (!clientSec) {
            return <p>No active checkout session. Please return to your cart.</p>;
        }

         return <CheckoutRender clientSecret={clientSec} />
}