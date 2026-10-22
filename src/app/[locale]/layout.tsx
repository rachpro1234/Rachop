import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ReduxProvider from "./redux/provider";
import { cookies } from "next/headers";

import { Roboto } from "next/font/google";


export const metadata = {
  title: "Rachop",
  description: "This ia a simple next js app",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>
};

const RootLayout = async ({ children, params }: Props) => {
  const { locale } = await params;

  // providing all messages to the client
  const messages = await getMessages();

  // store Mode state
  const cookieStore = await cookies();
  const mode = cookieStore.get("mode")?.value || 'dark';
  return (
    <html lang={locale}>
      <body className={` ${mode} bg-white dark:bg-[#131927] bg-[repeating-linear-gradient(45deg,theme(colors.gray.800)_0,theme(colors.gray.800)_1px,transparent_1px,transparent_13px)]`}>
        <NextIntlClientProvider messages={messages}>
          <ReduxProvider>{children}</ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
