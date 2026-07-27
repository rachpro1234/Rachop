"use client";

import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { createCheckoutSession } from "@/src/app/actions/stripe";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY!);

export default function CheckoutForm({ priceId }: { priceId: string }) {
  // We fetch the clientSecret via the Server Action
  const fetchClientSecret = async () => {
    const { clientSecret } = await createCheckoutSession(priceId);
    return clientSecret as string;
  };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}