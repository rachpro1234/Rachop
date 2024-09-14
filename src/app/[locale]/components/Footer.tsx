'use client'
import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Footer = () => {
  const t = useTranslations("Footer");

  // get the current year to be used in the footer
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-100 dark:bg-slate-950 dark:text-white">
      <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
          <Link
            className="animate-bounce inline-block rounded-full bg-purple-600 p-2 text-white shadow transition hover:bg-[#fff] hover:text-accent   hover:border-solid border-2 hover:border-purple-600     sm:p-3 lg:p-4"
            href="#"
            onClick={scrollToTop}
          >
            <span className="sr-only">Back to top</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>

        <div className="lg:flex lg:items-end lg:justify-between">
          <div className="italic">
            <div className="flex justify-center text-accent lg:justify-start text-4xl font-bold uppercase">
              Rachop
            </div>

            <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 lg:text-left">
              " {t(
                `your_favorite_place_not_only_to_shop_but_to_get_your_need_satisfied_too`
              )}
              {t("Rachop_has_always_provided_the_things_every_client_needed")}.
              {t(`Don't_miss_this_chance_and_get_you_what_you_search_for`)} "
            </p>
          </div>

          <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
            <li>
              <Link
                className="dark:text-white capitalize text-gray-700 transition hover:text-accent"
                href={`/about`}
              >
                {" "}
                {t("about_us")}{" "}
              </Link>
            </li>

            <li>
              <Link
                className="dark:text-white capitalize text-gray-700 transition hover:text-accent"
                href={`/order`}
              >
                {" "}
                {t("order")}{" "}
              </Link>
            </li>

            <li>
              <Link
                className="dark:text-white capitalize text-gray-700 transition hover:text-accent"
                href={`/men`}
              >
                {" "}
                {t("men")}{" "}
              </Link>
            </li>

            <li>
              <Link
                className="dark:text-white capitalize text-gray-700 transition hover:text-accent"
                href={`/women`}
              >
                {" "}
                {t("women")}{" "}
              </Link>
            </li>
          </ul>
        </div>

        <p className="mt-12 text-center text-sm dark:text-white text-gray-500 lg:text-right capitalize">
          {t("copyright")} &copy; {currentYear} rachop {t("all_rights_reserved")}.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
