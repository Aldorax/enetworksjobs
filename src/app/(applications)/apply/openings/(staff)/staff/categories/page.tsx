import { MainNav } from "@/app/(admin)/admin/dashboard/components/main-nav";
import { UserNav } from "@/app/(admin)/admin/dashboard/components/user-nav";
import { StaffCategories } from "@/components/aceternity/staffCategories";
import Link from "next/link";

export default function StaffCat() {
  return (
    <div className="max-w-screen grid h-screen max-h-full w-screen grid-cols-1 justify-evenly lg:grid-cols-2">
      <div className="fixed z-[995] flex h-16 w-full items-center border-b border-black bg-white px-2 text-black">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
      <div className="flex h-full max-w-full flex-col bg-white p-3 pt-18 text-black md:p-10 lg:min-h-screen">
        <div className="flex flex-col">
          <div className="mt-10">
            <div className="text-xl font-bold underline">
              Requirements for Applying
            </div>
            <div className="text-medium mt-2 pl-4 font-medium lg:pl-10">
              <li>
                Applicant must be{" "}
                <span className="text-primary-orange-light">
                  BE SALES CENTRIC
                </span>
              </li>
              <li>
                Applicant must be a{" "}
                <span className="text-primary-orange-light">
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
          <div>
            <div className="mt-4">
              <h1 className="text-xl font-bold underline">Remuneration</h1>
            </div>
            <div>
              <ul className="text-medium mt-2 pl-4 font-medium lg:pl-10">
                <p>
                  <span className="text-primary-orange-light">Note:</span> All
                  employees will be on a 3 months probation period.
                </p>
                <p>
                  <span className="text-primary-orange-light">Note:</span> All
                  employees that have succeeded within the 3 months probation
                  period will be confirmed with a possible salary review and
                  access to approved allowances.
                </p>
              </ul>
            </div>
            <div className="text-medium mt-2 pl-4 lg:pl-10">
              <li>
                <span className="font-semibold text-primary-orange-light">
                  State Managers and Desk Officers:
                </span>{" "}
                ₦1,200,000 Basic/Annum
              </li>
              <li>
                <span className="font-semibold text-primary-orange-light">
                  Dep State Manager and Dep State Desk Officer:
                </span>{" "}
                <span className="space-x-5">₦840,000</span>
                Basic/Annum
              </li>
              <li>
                <span className="font-semibold text-primary-orange-light">
                  Other State Officials:
                </span>{" "}
                <span className="space-x-5">₦600,000</span>
                Basic/Annum
              </li>
              <li>
                <span className="font-semibold text-primary-orange-light">
                  LG Manager/Desk Officer:
                </span>{" "}
                <span className="space-x-5">₦720,000</span>
                Basic/Annum
              </li>
              <li>
                <span className="font-semibold text-primary-orange-light">
                  LG Dep Manager/Dep Desk Officer:
                </span>{" "}
                <span className="space-x-5">₦480,000</span>
                Basic/Annum
              </li>
              <li>
                <span className="font-semibold text-primary-orange-light">
                  Other LG Officials:
                </span>{" "}
                <span className="space-x-5">₦360,000</span>
                Basic/Annum
              </li>
              <p className="my-2">
                <span className="font-semibold text-primary-orange-light">
                  Note:
                </span>{" "}
                All positions come with contributory pension plans for
                post-engagement welfare program upon confirmation after 3 months
                probation.
              </p>
              <p>
                <span className="font-semibold text-primary-orange-light">
                  Note:
                </span>{" "}
                All positions come with allowances for airtime and data upon
                confirmation after 3 months probation.
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-xl font-bold underline">
              Condition of service
            </div>
            <ul className="text-medium my-4 list-none pl-10 font-medium">
              <li>All employees will be on a 3 months probation period</li>
              <li>
                All employees that have succeeded within the 3 months probation
                period will be confirmed with a possible salary review and
                access to approved allowances
              </li>
              <li>
                Salaries will be pro-rated during probationary period based on
                the productivity level of each employee
              </li>
              <li>
                Employee salaries will be paid through their ENetworksPay cards
              </li>
              <li>
                Scheduled, defined and measurable tasks will be assigned to
                employees during probation for assessment
              </li>
              <li>
                Employees are expected to be dedicated, loyal and disciplined
              </li>
              <li>
                Employees are not to misrepresent or misguide the public about
                the organization or be involved in any fraudulent activities
                either directly or indirectly.
              </li>
              <li>
                Employees are to participate in a mandatory orientation program
                pre and post employment.
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Categories */}
      <div className="flex h-full w-full max-w-full flex-col bg-gray-200 p-4 md:p-10 py-18 text-black md:h-screen">
        <section className="mt-10">
          <StaffCategories />
        </section>
        <div className="mt-4 w-full p-4 text-black">
          <h1>
            Do you want to re-apply instead? If so,{" "}
            <Link
              href="/apply/openings/staff/re-apply/categories"
              className="cursor-pointer font-semibold text-primary-orange-light underline"
            >
              Click Here
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
}
