'use client'


import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";
// Phosphor icons
import { FacebookLogo } from "@phosphor-icons/react/dist/ssr";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { XLogo } from "@phosphor-icons/react/dist/ssr";
import { LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const HeaderTop = () => {
  const t = useTranslations("Index");
  return (
    <div className="border-b border-gray-200 hidden sm:block">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <div className="hidden lg:flex gap-1">
            <Link href="#" className="header_top__fb_wrapper dark:bg-slate-950 dark:text-white">
              <FacebookLogo size={20} weight="bold" />
            </Link>
            <Link href="#" className="header_top__inst_wrapper dark:bg-slate-950 dark:text-white">
              <InstagramLogo size={20} weight="bold" />
            </Link>
            <Link href="#"  className="header_top__twi_wrapper dark:bg-slate-950 dark:text-white">
              <XLogo size={20} weight="bold" />
            </Link>
            <Link href="#" className="header_top__lin_wrapper dark:bg-slate-950 dark:text-white">
              <LinkedinLogo size={20} weight="bold" />
            </Link>
          </div>

          <div className="text-gray-500 text-[12px]">
            <b className="dark:text-white">{t("FREE_SHIPPING")}</b> {t("THIS_WEEK_ORDER_OVER")} - <span className="text-accent font-medium">{t("50$")}</span>
          </div>

          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
