import "./globals.css";
import { NextIntlClientProvider, useMessages } from "next-intl";
import ReduxProvider from "./redux/provider";

export const metadata = {
  title: "Rachop",
  description: "This ia a simple next js app",
  icons: {
    icon: '/assets/logo.png',
  },
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
  return (
    <html lang={locale}>
      <body className="bg-white dark:bg-[#131927]">
        <NextIntlClientProvider messages={messages}>
          <ReduxProvider>{children}</ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
