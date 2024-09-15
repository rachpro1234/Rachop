"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import aboutBanner from "/public/about/aboutBanner.jpg";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import image1 from "/public/about/image1.jpg";
import image2 from "/public/about/image2.jpg";
import image3 from "/public/about/image3.jpg";
import image4 from "/public/about/image4.jpg";
import image5 from "/public/about/image5.jpg";
import image6 from "/public/about/image6.jpg";
import image7 from "/public/about/image7.jpg";


const About = () => {
  const t = useTranslations("About");
  const [text] = useTypewriter({
    words: [
      `berlin,${t("germany")}`,
      `Milan,${t("italy")}`,
      `wien,${t("austria")}`,
      `zurich,${t("swiss")}`,
      `agadir,${t("morocco")}`,
    ],
    loop: 0,
  });



  return (
    <div>
      <div className="pt-6 relative">
        <h1 className="text-7xl flex items-center justify-center capitalize absolute text-white ml-4">
          {t("about")}
        </h1>
        <Image
          src={aboutBanner}
          width={900}
          height={900}
          property="true"
          placeholder="blur"
          alt="banner"
          className="w-[100%] h-[500px] object-cover object-right rounded-lg"
        />

        <div className="pt-16 sm:flex items-center justify-center gap-10">
          <h1 className="sm:text-5xl text-3xl w-[100%] text-center capitalize font-medium dark:text-white">
            {t("we_have_fashion_store_in")}
            <span className="text-accent ml-4 uppercase font-bold">
              {text}
              <Cursor />
            </span>
          </h1>
        </div>

        <div className="about-area">
          <div className="container md:max-w-[740px] w-[100%] sm:px-4 sm:mx-auto pt-10">
            <h1 className="sm:text-7xl text-4xl font-bold capitalize text-center dark:text-white">
              {t("our_story")}
            </h1>
            <p className="text-[#646D77] font-normal leading-6 pt-5 text-center mb-14">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
              dignissimos sit accusantium asperiores? Ex sunt optio praesentium
              odio possimus dolorem provident voluptates, vel id eligendi quia
              sapiente molestias pariatur rem accusamus corporis eum hic dolorum
              maxime, tempore at non. Placeat quibusdam totam unde dicta libero
              autem dolores pariatur, numquam officiis cupiditate,
              exercitationem, vitae veniam harum animi explicabo perspiciatis
            </p>
            <div className="w-full max-w-5xl p-5 pb-10 mx-auto mb-10 gap-5 sm:columns-3 columns-2 space-y-5 overflow-hidden">
              <Image
                src={image1}
                width={600}
                height={600}
                alt="image"
                className="cursor-pointer transition duration-500 hover:scale-110"
              />
              <Image
                src={image2}
                width={600}
                height={600}
                alt="image"
                className="cursor-pointer transition duration-500 hover:scale-110"
              />
              <Image
                src={image3}
                width={600}
                height={600}
                alt="image"
                className="cursor-pointer transition duration-500 hover:scale-110"
              />
              <Image
                src={image4}
                width={600}
                height={600}
                alt="image"
                className="cursor-pointer transition duration-500 hover:scale-110"
              />
              <Image
                src={image5}
                width={600}
                height={600}
                alt="image"
                className="cursor-pointer transition duration-500 hover:scale-110"
              />
              <Image
                src={image6}
                width={700}
                height={700}
                alt="image"
                className="cursor-pointer transition duration-500 hover:scale-110"
              />

            </div>

            <div>
              <h1 className="sm:text-7xl text-4xl font-bold capitalize text-center dark:text-white">
                {t("journy_start_from")}
              </h1>
              <p className="text-[#646D77] font-normal leading-6 pt-5 text-center mb-14">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Maiores, fugit sint nesciunt unde aut quaerat veniam amet eius
                architecto est, accusamus corrupti illo. Laudantium facere sequi
                ducimus ipsum unde exercitationem quibusdam odit corrupti
                recusandae tempore provident nobis, libero rerum possimus natus
                ratione culpa iusto quo nostrum et tenetur fugit harum?
              </p>
            </div>
          </div>
          <div className="overflow-hidden">
            <Image
              src={image7}
              width={900}
              height={900}
              property="true"
              alt="banner"
              className="w-[100%] h-[500px] object-cover object-center rounded-lg mb-10 cursor-pointer transition duration-500 hover:scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
