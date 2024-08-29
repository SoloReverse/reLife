"use client";

import { CircleFlag } from "react-circle-flags";
import { useMediaQuery } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname } from "@/navigation";
import Link from "next/link";
import { Flag, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { setUserLocale } from "@/services/locale";
import { redirect, RedirectType } from "next/navigation";

type Status = {
  value: "ar" | "en";
  label: string;
};

const statuses: Status[] = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "ar",
    label: "عربي",
  },
];

export function LocaleSwitcher({ locale }: { locale: "en" | "ar" }) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="p-4">
            <Globe size={18} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="z-100 w-[200px] p-0" align="start">
          <StatusList
            setOpen={setOpen}
            setSelectedStatus={setSelectedStatus}
            locale={locale}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost">
          <Globe size={18} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList
            setOpen={setOpen}
            setSelectedStatus={setSelectedStatus}
            locale={locale}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({
  setOpen,
  setSelectedStatus,
  locale,
}: {
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: Status | null) => void;
  locale: "en" | "ar";
}) {
  const path = usePathname();
  return (
    <Command>
      <CommandList>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              onClick={() => redirect(path, RedirectType.replace)}
              className={cn(
                "p-4 lg:p-2",
                locale == status.value
                  ? "bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-600 hover:dark:bg-neutral-700"
                  : "hover:bg-neutral-300 hover:dark:bg-neutral-700"
              )}
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                locale == status.value
                  ? null
                  : setSelectedStatus(
                      statuses.find((priority) => priority.value === value) ||
                        null
                    );
                setUserLocale(value);
                setOpen(false);
              }}
            >
              <CircleFlag
                countryCode={status.value == "ar" ? "ae" : "us"}
                height={24}
                className={
                  "h-6 rounded-xl border border-background ltr:mr-6 rtl:ml-6"
                }
              />
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
