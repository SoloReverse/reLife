import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getUserLocale } from "@/services/locale";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    template: "%s | reLife",
    default: "Welcome to ReLife",
  },
  description:
    "Re.life is a leading online marketplace dedicated to sustainability and environmental responsibility. Our platform connects individuals and businesses with recycling services, making it easier to recycle materials and reduce waste. By offering a user-friendly interface, we facilitate the efficient collection and processing of recyclables, helping to close the loop in the circular economy. ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const locale = await getUserLocale();
  return (
    <html lang={locale} dir={locale == "ar" ? "rtl" : "ltr"}>
      <body
        className={cn(
          "bg-background font-sans antialiased fixed w-full h-full max-h-screen pb-24",
          inter.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
