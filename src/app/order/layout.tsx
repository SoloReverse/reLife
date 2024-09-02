import { Card } from "@/components/ui/card";
import { ReactNode, Suspense } from "react";

export default function Layout({
  children,
  chatpage,
}: {
  children: ReactNode;
  chatpage: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-between w-full h-full">
      <Card className="border-none w-full h-[95%] lg:max-w-[900px]rounded-2xl transition-all lg:max-w-[700px] lg:py-2 shadow-none lg:drop-shadow mx-48 lg:my-6 bg-neutral-600/50">
        {chatpage}
      </Card>
      <div>{children}</div>
    </div>
  );
}
