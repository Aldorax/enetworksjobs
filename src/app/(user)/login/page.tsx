import { BentoGridSecondDemo2 } from "@/components/aceternity/applicationVariations2";
import { Header } from "@/components/header";

export default function Openings() {
  return (
    <div className="">
      <Header />
      <section className="min-w-screen md:max-w-screen mt-4 flex h-full min-h-screen flex-col items-center justify-center md:mt-0 md:max-h-screen">
        <BentoGridSecondDemo2 />
      </section>
    </div>
  );
}
