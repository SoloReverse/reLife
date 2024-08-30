import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ReactNode } from "react";

export default function HomeTemplate({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {/* <div className="blur-3xl bg-cyan-600 w-96 h-screen top-24 left-2 rounded-full animate-float -z-50"></div> */}
      <div className="h-full max-h-full overflow-hidden">{children}</div>
    </>
  );
}
