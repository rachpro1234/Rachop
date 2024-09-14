"use client";

import React, { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
// import Image from "next/image";

const LanguageSwitcher = () => {
  // const [isPending, startTransition] = useTransition()
  const router = useRouter();

  // to get the active locale tochange the selected language in the dropdown menu
  const localeActive = useLocale();

  const onChangeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    // router.replace(`/${nextLocale}`);
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`; // not to redirect to home page when switching between languages
    router.refresh();
  };

  return (
    <div className="flex gap-4">
      <div className="flex row gap-4">
        <label>
          <p className="sr-only">Language:</p>
          <select
            defaultValue={localeActive}
            onChange={onChangeLanguage}
            className="cursor-pointer dark:bg-[#131927] dark:text-white"
          >
            <option value="en">Englich</option>
            <option value="de">German</option>
            <option value="it">Italien</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
