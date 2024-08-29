import { ReactNode, Suspense } from "react";

export default function Layout({
  children,
  chatpage,
}: {
  children: ReactNode;
  chatpage: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between px-8 py-4 w-full">
      <div className="w-full h-96 lg:max-w-[900px] lg:max-h-[600px] rounded-2xl backdrop-blur-lg bg-neutral-800/40 drop-shadow-lg transition-all p-6">
        {chatpage}
      </div>
      <div>{children}</div>
    </div>
  );
}
