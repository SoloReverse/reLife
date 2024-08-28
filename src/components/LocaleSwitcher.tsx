"use client";

import * as React from "react";

import { CircleFlag } from "react-circle-flags";
import { useMediaQuery } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link, usePathname } from "@/navigation";
import { Flag, Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

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

export function LocaleSwitcher({ locale }: { locale: "en" | "ar" | string }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null,
  );

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
  locale: "en" | "ar" | string;
}) {
  const path = usePathname();
  return (
    <Command>
      <CommandList>
        <CommandGroup>
          {statuses.map((status) => (
            <Link href={path} locale={status.value}>
              <CommandItem
                className={cn(
                  "p-4 lg:p-2",
                  locale == status.value
                    ? "bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-600 hover:dark:bg-neutral-700"
                    : "hover:bg-neutral-300 hover:dark:bg-neutral-700",
                )}
                key={status.value}
                value={status.value}
                onSelect={(value) => {
                  locale == status.value
                    ? null
                    : setSelectedStatus(
                        statuses.find((priority) => priority.value === value) ||
                          null,
                      );
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
            </Link>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
