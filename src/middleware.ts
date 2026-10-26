import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const nextIntlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "de", "it"],

  // Used when no locale matches
  defaultLocale: "en",
  localePrefix: "never", // hide the language prefix ex: /en to let the navbar active class to function
});

export default function (req: NextRequest): NextResponse {
  return nextIntlMiddleware(req);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.webp$).*)'
  ],
};
