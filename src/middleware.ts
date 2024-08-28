import { IncomingHttpHeaders } from "http";
import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

export default createMiddleware({
  locales: ["en", "ar"],
  defaultLocale: "en",
});

// export function middleware(request: NextRequest) {
//   const response = i18nMiddleware(request);
//   return response;
// }

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ar|en)/:path*"],
};
