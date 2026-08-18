'use client'

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

interface SessionDetails {
    amountTotal: number;
    currency: string;
    created: number;
    paymentStatus: string;
    id: string;
}




function paymentCompleted() {

    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [session, setSession] = useState<SessionDetails | null>(null);

    useEffect(() => {
        if(!sessionId) return;

        const fetchSession = async () => {
            try {
                const response = await axios.get<SessionDetails>(`${process.env.NEXT_PUBLIC_API_URL}/api/checkout-session/session/${sessionId}`);
                setSession(response.data);
                console.log(response.data);
            } catch (error) {
                console.log("Failed to fetch session", error)
            }
        }

        fetchSession();
    }, [sessionId]);


    if(!session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff] to-accent">
                <p className="text-white text-xl">Loading your receipt...</p>
            </div>
        )
    };

    const formattedDate = new Date(session.created * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const formattedAmount = (session.amountTotal / 100).toFixed(2);

  return (
<div className="min-h-screen overflow-hidden relative bg-gradient-to-br from-[#fff] to-accent">
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 max-w-md w-full text-center shadow-2xl">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Success!</h1>
            <p className="text-xl text-white/90 mb-2">Payment Completed</p>
            <p className="text-white/70">Your transaction has been processed successfully</p>
          </div>

          <div className="bg-white/10 rounded-2xl p-6 mb-8 border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-white/70">Amount</span>
              <span className="text-2xl font-bold text-white">${formattedAmount}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-white/70">Transaction ID</span>
              <span className="text-white font-mono text-sm">#{session.id.slice(-10).toUpperCase()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Date</span>
              <span className="text-white">{formattedDate}</span>
            </div>
          </div>

          <div className="space-y-4">
            <Link href="/">
                <button className="w-full bg-transparent border-2 border-white/30 text-white font-semibold py-4 px-6 rounded-2xl hover:bg-white/10 transition-all duration-300">
                Continue Shopping
                </button>
            </Link>
          </div>

          <div className="mt-8 text-white/60 text-sm">
            <p>Thank you for your purchase!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default paymentCompleted
