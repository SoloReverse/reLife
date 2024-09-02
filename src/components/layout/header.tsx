"use client";

import { HamburgerMenu } from "../ui/hamburgermenu";
import { ThemeImage } from "./ThemeImage";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useState } from "react";
import { ModeToggle } from "@/components/ui/toggle";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { Link } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import { LocaleSwitcher } from "../LocaleSwitcher";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

function MenuPublic() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("navigation.header");
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Button
        variant={"ghost"}
        onClick={() => setOpen(!open)}
        className="pointer-events-auto px-0 py-2"
      >
        <HamburgerMenu size={24} toggled={open} />
      </Button>
      <Sheet modal open={open}>
        <SheetContent side={"top"} className="pt-24" close={false}>
          <div className="my-1">
            <Button
              variant="default"
              disabled
              className="my-1 w-full lg:mr-4 lg:w-auto lg:justify-start"
            >
              {t("actions.signup")}
            </Button>
            <Button
              variant="secondary"
              className="my-1 w-full lg:w-auto lg:justify-end"
            >
              {t("actions.login")}
            </Button>
            <ModeToggle text="theme"></ModeToggle>
          </div>
          <div className="mt-4"></div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export function Header() {
  const locale = useLocale();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // just trigger this so that the initial state
    // is updated as soon as the component is mounted
    // related: https://stackoverflow.com/a/63408216
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-100 flex w-full flex-row justify-between overflow-visible px-4 pb-4 pt-4 transition-all duration-1000 ease-in-out lg:px-12",
          scrollY > 75
            ? "bg-background/80 backdrop-blur-lg dark:bg-background/80"
            : null
        )}
      >
        <Link href={"/"} className="flex items-center">
          <ThemeImage
            locale={locale}
            enLight="/logos/en.webp"
            enDark="/logos/en-dark.webp"
            arLight="/logos/ar.webp"
            arDark="/logos/ar-dark.webp"
            alt="Re.Life Marketplace logo"
            width={100}
            height={30}
          />
        </Link>
        <div className="flex items-center justify-between  align-middle">
          <LocaleSwitcher
            //@ts-ignore
            locale={locale}
          />
          <MenuPublic />
        </div>
      </header>
    </>
  );
}
