import { BentoGridSecondDemo } from "@/components/aceternity/applicationVariations";
import { StaffCategories2 } from "@/components/aceternity/staffCategories2";

export default function StaffReapplyCategories() {
  return (
    <div className="max-w-screen grid h-screen max-h-full w-screen grid-cols-1 justify-evenly lg:grid-cols-2">
      {/* Requirments */}
      <div className="flex max-h-full max-w-full flex-col bg-white p-10 py-18 text-black lg:h-screen">
        <div className="flex flex-col">
          <div className="mt-4">
            <div className="text-xl font-bold underline">
              Requirements for Re-Applying
            </div>
            <div className="text-medium mt-2 pl-10 font-medium">
              <li>
                Applicant must be{" "}
                <span className="text-primary-orange">BE SALES CENTRIC</span>
              </li>
              <li>
                Applicant must be a{" "}
                <span className="text-primary-orange">
                  MARKETING SUPER CHARACTER
                </span>
              </li>

              <li>
                Applicant must have an active and functional enetworkspay agent
                account
              </li>
              <li>Applicant must have an enetworkspay Card</li>
            </div>
          </div>
          <div className="mt-10">
            <div className="text-xl font-bold underline">Important Notice:</div>
            <div className="text-medium mt-2 pl-10 font-medium">
              <li className="text-medium font-medium">
                {" "}
                If you apply for 2 or more positions, you will be paid for only
                one position even if you are selected for more than one
                position. You will be able to select the position you want to be
                paid for when you are selected.
              </li>
            </div>
          </div>
        </div>
      </div>
      {/* Categories */}
      <div className="flex h-screen max-w-full flex-col bg-gray-200 p-10 py-18 text-black">
        <StaffCategories2 />
        <div className="mt-4 w-full p-4 text-white"></div>
      </div>
    </div>
  );
}
