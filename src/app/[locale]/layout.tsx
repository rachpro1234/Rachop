import "./globals.css";
import { NextIntlClientProvider, useMessages } from "next-intl";
import ReduxProvider from "./redux/provider";
import { cookies } from "next/headers";

export const metadata = {
  title: "Rachop",
  description: "This ia a simple next js app",
};

type Props = {
  children: React.ReactNode;
  params: {
    locale: "en" | "de" | "it";
  };
};

const RootLayout: React.FC<Props> = ({ children, params: { locale } }) => {
  // providing all messages to the client
  const messages = useMessages();

  // store Mode state
  const cookieStore = cookies();
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
