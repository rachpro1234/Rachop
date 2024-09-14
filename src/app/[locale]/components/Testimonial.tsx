import React from "react";
import Image from "next/image";
import { Quotes } from "@phosphor-icons/react/dist/ssr";

interface propsType {
  name: string;
  img: string;
  position: string;
  testimonial: string;
}

const Testimonial: React.FC<propsType> = ({
  name,
  img,
  position,
  testimonial,
}) => {
  return (
    <div className="flex items-center relative">
      <div className="w-[100%]">
        <Image
          alt="image"
          src={img}
          width={2000}
          height={2000}
          property="false"
          className="rounded-md object-cover sm:object-top-[20%] w-[100%] h-[500px]"
        />
      </div>
      <div className="absolute left-[30px] lg:space-y-4 bg-[#ffffffa2] sm:bg-transparent p-6 sm:p-0 rounded-lg sm:rounded-none">
        <div className="flex-col relative">
          <h3 className="text-accent font-bold uppercase">{name}</h3>
          <p className="sm:text-[#8b8b8b] text-blakish">{position}</p>
          <p className="text-white">
            <span className="text-accent absolute -left-[9.2%]">
              <Quotes size={20} weight="fill" />
            </span>
            {testimonial}
            <span className="text-accent absolute">
              <Quotes size={20} weight="fill" />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
