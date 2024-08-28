import { ThemeImage } from "@/components/layout/ThemeImage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("navigation.footer");
  return (
    <footer className="border-t border-transparent bg-zinc-900 px-8 pb-6 pt-20 text-zinc-50 dark:border-zinc-700 dark:bg-transparent">
      <div className="hidden lg:flex lg:visible invisible md:mx-auto max-w-screen justify-end">
        <Accordion
          defaultValue={["platform", "company"]}
          type="multiple"
          orientation="vertical"
          className="w-full lg:w-[600px] flex-row gap-x-12 lg:flex"
        >
          <AccordionItem value="platform" disabled className="border-none">
            <AccordionTrigger className="text-xl font-semibold">
              {t("Platform.title")}
            </AccordionTrigger>
            <AccordionContent className="mx-6 flex flex-col gap-y-2 text-lg font-medium text-zinc-200">
              <Link href={"/"}>{t("Platform.sitelinks.signup")}</Link>
              <Link href={"/"}>{t("Platform.sitelinks.help")}</Link>
              <Link href={"/"}>{t("Platform.sitelinks.privacy")}</Link>
              <Link href={"/"}>{t("Platform.sitelinks.tc")}</Link>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="company" disabled className="border-none">
            <AccordionTrigger className="text-xl font-semibold">
              {t("Company.title")}
            </AccordionTrigger>
            <AccordionContent className="mx-6 flex flex-col gap-y-2 text-lg font-medium text-zinc-200">
              <Link href={"/"}>{t("Company.sitelinks.about")}</Link>
              <Link href={"/"}>{t("Company.sitelinks.investors")}</Link>
              <Link href={"/"}>{t("Company.sitelinks.careers")}</Link>
              <Link href={"/"}>{t("Company.sitelinks.contact")}</Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="lg:invisible visible lg:hidden md:mx-auto max-w-screen flex justify-end">
        <Accordion
          type="single"
          orientation="vertical"
          className="w-full lg:w-[600px] flex-row gap-x-12 lg:flex justify-end"
        >
          <AccordionItem value="platform" className="border-none">
            <AccordionTrigger className="text-xl font-semibold">
              {t("Platform.title")}
            </AccordionTrigger>
            <AccordionContent className="mx-6 flex flex-col gap-y-2 text-lg font-medium text-zinc-200">
              <Link href={"/"}>{t("Platform.sitelinks.signup")}</Link>
              <Link href={"/"}>{t("Platform.sitelinks.help")}</Link>
              <Link href={"/"}>{t("Platform.sitelinks.privacy")}</Link>
              <Link href={"/"}>{t("Platform.sitelinks.tc")}</Link>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="company" className="border-none">
            <AccordionTrigger className="text-xl font-semibold">
              {t("Company.title")}
            </AccordionTrigger>
            <AccordionContent className="mx-6 flex flex-col gap-y-2 text-lg font-medium text-zinc-200">
              <Link href={"/"}>{t("Company.sitelinks.about")}</Link>
              <Link href={"/"}>{t("Company.sitelinks.investors")}</Link>
              <Link href={"/"}>{t("Company.sitelinks.careers")}</Link>
              <Link href={"/"}>{t("Company.sitelinks.contact")}</Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="mt-2">
        <Link href={"/"} className="flex items-center">
          <ThemeImage
            locale={locale}
            enDark="/logos/en-dark.webp"
            enLight="/logos/en-dark.webp"
            arDark="/logos/ar-dark.webp"
            arLight="/logos/ar-dark.webp"
            alt="Scrapp Platform Logo"
            width={120}
            height={30}
          />
        </Link>
        <p dir="ltr" className="mt-2 text-sm text-zinc-200">
          @ 2024 Re.Life All rights reserved.
        </p>
      </div>
    </footer>
  );
}
