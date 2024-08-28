import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import Image, { ImageProps } from "next/image";

type Props = Omit<ImageProps, "src" | "priority" | "loading"> & {
  enLight: string;
  enDark: string;
  arLight: string;
  arDark: string;
  locale: string;
};

export const ThemeImage = (props: Props) => {
  const locale = useLocale();

  const { enLight, enDark, arLight, arDark, ...rest } = props;

  if (locale == "en") {
    return (
      <>
        <Image
          {...rest}
          src={enLight}
          className={cn(props.className, "ltr:dark:hidden")}
        />
        <Image
          {...rest}
          src={enDark}
          className={cn(props.className, "ltr:hidden ltr:dark:block")}
        />
      </>
    );
  } else {
    return (
      <>
        <Image
          {...rest}
          src={arLight}
          className={cn(props.className, "rtl:dark:hidden")}
        />
        <Image
          {...rest}
          src={arDark}
          className={cn(props.className, "rtl:hidden rtl:dark:block")}
        />
      </>
    );
  }
};
