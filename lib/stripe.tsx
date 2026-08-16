import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)


export default function CheckoutRender({ clientSecret }: { clientSecret: string } ) {


    const options = ({
        clientSecret
    })

    return (
        <EmbeddedCheckoutProvider stripe={stripePromise}  options={options}>
           <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
    )
}