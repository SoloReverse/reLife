import { useLocale } from "next-intl";
import * as React from "react";
import { MoveRight, MoveLeft, ArrowLeft, ArrowRight } from "lucide-react";

export function MovingArrow({
  size,
  className,
}: React.ComponentPropsWithoutRef<any>) {
  const locale = useLocale();

  return locale == "ar" ? (
    <MoveLeft size={size} className={className} />
  ) : (
    <MoveRight size={size} className={className} />
  );
}

export function MovingArrowNarrow({
  size,
  className,
}: React.ComponentPropsWithoutRef<any>) {
  const locale = useLocale();

  return locale == "ar" ? (
    <ArrowLeft size={size} className={className} />
  ) : (
    <ArrowRight size={size} className={className} />
  );
}
