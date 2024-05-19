import { MainNav } from "@/app/(admin)/dashboard/components/main-nav";
import { UserNav } from "@/app/(admin)/admin/dashboard/components/user-nav";
import { BentoGridSecondDemo3 } from "@/components/aceternity/applicationVariations3";

export default function Openings() {
  return (
    <div className="m-0 p-0">
      <div className="fixed z-[995] flex h-16 w-full items-center border-b border-black bg-white px-4 text-black">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
      <section className="min-w-screen md:max-w-screen flex h-full min-h-screen flex-col items-center justify-center md:mt-0 md:max-h-screen">
        <section className="mt-20 w-full p-1">
          <BentoGridSecondDemo3 />
        </section>
      </section>
    </div>
  );
}
