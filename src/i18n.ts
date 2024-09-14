import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config
const locales = ["en", "de", "it"];

export default getRequestConfig(async ({ locale }) => {
  // define the basename of the language file
  const baseLocaleName = new Intl.Locale(locale).baseName;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(baseLocaleName)) notFound();
  // if(!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./messages/${baseLocaleName}.json`)).default,
  };
});
