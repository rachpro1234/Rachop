import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";



interface propsType {
  title: string;
  img: string;
  desc: string;
  price: string;
}

const Slide: React.FC<propsType> = ({ title, img, desc, price }) => {

  const t = useTranslations("Index")


  return (
    <div className="relative pt-6">
      <div className="absolute left-[30px] md:left-[70px] max-w-[250px] sm:max-w-[350px] top-[50%] -translate-y-[50%]  lg:space-y-4 bg-[#ffffffa2] sm:bg-transparent p-4 sm:p-0 rounded-lg sm:rounded-none">
        <h3 className="text-white text-[24px] lg:text-[28px]">{title}</h3>
        <h2 className="text-accent text-[26px] md:text-[30px] lg:text[44px] font-bold leading-1.2 uppercase">
          {desc}
        </h2>
        <h3 className="text-[24px] text-gray-300">
          {t("starting_at")}
          <b> {price}</b>
        .00
        </h3>
        <button type="button" className="bg-accent mt-3.5 text-white text-[14px] md:text-[16px] p-2 px-4 rounded-lg inline-block cursor-pointer hover:bg-blakish uppercase text-bold transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">{t("shop_now")}</button>
      </div>
      <Image
        src={img}
        alt="photo"
        property="false"
        width={2000}
        height={2000}
        className="w-[100%] h-[400px] sm:min-h-screen rounded-xl object-cover md:object-right lg:object-[right_30%]"
      />
    </div>
  );
};

export default Slide;
