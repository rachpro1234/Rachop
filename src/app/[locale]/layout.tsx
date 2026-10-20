import { use } from "react";
import "./globals.css";
import { NextIntlClientProvider, useMessages } from "next-intl";
import ReduxProvider from "./redux/provider";
import { cookies, type UnsafeUnwrappedCookies } from "next/headers";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

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

const RootLayout: React.FC<Props> = props => {
  const params = use(props.params);

  const {
    locale
  } = params;

  const {
    children
  } = props;

  // providing all messages to the client
  const messages = useMessages();

  // store Mode state
  const cookieStore = (/* @next-codemod-error Await this API and update its callers; remove the temporary UnsafeUnwrappedCookies cast after repairing the migration. */
  cookies() as unknown as UnsafeUnwrappedCookies);
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
