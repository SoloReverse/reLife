import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ModeToggle } from "@/components/ui/toggle";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Re.life Market",
  description:
    "Re.life is a leading online marketplace dedicated to sustainability and environmental responsibility. Our platform connects individuals and businesses with recycling services, making it easier to recycle materials and reduce waste. By offering a user-friendly interface, we facilitate the efficient collection and processing of recyclables, helping to close the loop in the circular economy. ",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  return (
    <html lang={locale} dir={locale == "ar" ? "rtl" : "ltr"}>
      <body
        className={cn(
          "relative min-h-screen overflow-x-clip bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
          {
            /**
             * This is a development only component, it will not be included in the production build
             * Meant for quick theme switching during development for faster testing
             */
            process.env.NODE_ENV === "development" && (
              <div className="fixed bottom-4 right-4">
                <ModeToggle />
              </div>
            )
          }
        </ThemeProvider>
      </body>
    </html>
  );
}
