'use client'
import React from "react";
import { Truck } from "@phosphor-icons/react";
import { CreditCard } from "@phosphor-icons/react";
import { Money } from "@phosphor-icons/react";
import { ClockCounterClockwise } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

import { motion } from "motion/react";


function SearviceBanner() {
  const t = useTranslations("ServiceBanner");

  const ServiceItems = [
    {
      id: 0,
      icon: <Truck size={72} color="rgb(151, 79, 218)" weight="thin" />,
      title: `${t("fast_&_free_delivery")}`,
      desc: `${t("free_delivered_orders")}`,
    },
    {
      id: 1,
      icon: <CreditCard size={72} color="rgb(151, 79, 218)"  weight="thin" />,
      title: `${t("safe_payment")}`,
      desc: `${t("pay_safely_your_orders")}`,
    },
    {
      id: 2,
      icon: <Money size={72} color="rgb(151, 79, 218)"  weight="thin" />,
      title: `${t("Money_Refund")}`,
      desc: `${t("get_your_money_back")}`,
    },
    {
      id: 3,
      icon: <ClockCounterClockwise size={72} color="rgb(151, 79, 218)" weight="thin" />,
      title: `${t("24h_availability")}`,
      desc: `${t("we_are_24h_available_for_you")}`,
    },
  ];

  return (
    <div className="servicee-banner container py-10">
      <div className="icon md:flex items-center justify-between gap-10 select-none w-full ">
        {ServiceItems.map((item, index) => (
          <motion.div
           initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }} 
            key={item.id} 
            className="dark:bg-slate-950 bg-white dark:text-white px-10 py-7 rounded-lg">
            <div className="flex items-center justify-center flex-col">
              {item.icon}
              <h4 className=" dark:text-white capitalize text-center font-bold">{item.title}</h4>
              <p className=" text-[#646D77] text-center">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default SearviceBanner;
