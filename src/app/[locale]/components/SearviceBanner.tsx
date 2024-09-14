'use client'
import React from "react";
import { Truck } from "@phosphor-icons/react";
import { CreditCard } from "@phosphor-icons/react";
import { Money } from "@phosphor-icons/react";
import { ClockCounterClockwise } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";



// columns-2 place-items-center md:columns-4 sm:columns-2 
function SearviceBanner() {
  const t = useTranslations("ServiceBanner");

  const ServiceItems = [
    {
      id: 0,
      icon: <Truck size={72} color="rgb(151, 79, 218)" />,
      title: `${t("fast_&_free_delivery")}`,
      desc: `${t("free_delivered_orders")}`,
    },
    {
      id: 1,
      icon: <CreditCard size={72} color="rgb(151, 79, 218)" />,
      title: `${t("safe_payment")}`,
      desc: `${t("pay_safely_your_orders")}`,
    },
    {
      id: 2,
      icon: <Money size={72} color="rgb(151, 79, 218)" />,
      title: `${t("Money_Refund")}`,
      desc: `${t("get_your_money_back")}`,
    },
    {
      id: 3,
      icon: <ClockCounterClockwise size={72} color="rgb(151, 79, 218)" />,
      title: `${t("24h_availability")}`,
      desc: `${t("we_are_24h_available_for_you")}`,
    },
  ];

  return (
    <div className="servicee-banner py-7">
      <div className="icon bg-[#eee] dark:bg-slate-950 p-10 md:flex items-center justify-between gap-10 select-none w-[100%]">
        {ServiceItems.map((item) => (
          <div key={item.id}>
            <div className="flex items-center justify-center flex-col">
              {item.icon}
              <h4 className=" dark:text-white capitalize text-center font-bold">{item.title}</h4>
              <p className=" text-[#646D77] text-center">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearviceBanner;
