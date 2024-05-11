import { BentoGridSecondDemo } from "@/components/aceternity/applicationVariations";
import Link from "next/link";

export default function StaffCategories() {
  return (
    <div className="grid max-h-full h-screen w-screen max-w-screen grid-cols-1 justify-evenly lg:grid-cols-2">
      {/* Requirments */}
      <div className="flex flex-col bg-white p-10 py-18 text-black min-h-screen max-h-full max-w-full">
        <div className="flex flex-col">

          <div className="mt-4">
            <div className="text-xl font-bold underline">Requirements for Applying</div>
            <div className="pl-10 mt-2 text-medium font-medium">
              <li>Applicant must be <span className="text-primary-orange">BE SALES CENTRIC</span></li>
              <li>Applicant must be a <span className="text-primary-orange">MARKETING SUPER CHARACTER</span></li>

              <li>Applicant must have an active and functional enetworkspay agent account</li>
              <li>Applicant must have an enetworkspay Card</li>
            </div>
          </div>
          <div>
          <div className="mt-4">
          <h1 className="text-xl font-bold underline">Remuneration</h1>
          </div>
            <div>
              <ul className="list-none my-4 pl-10 text-medium font-medium">
                <p>
                  <span className="text-primary-orange">Note:</span> All employees will be on a 3 months probation period.
                </p>
                <p>
                <span className="text-primary-orange">Note:</span> All employees that have succeeded within the 3 months probation period will be confirmed with a possible salary review and access to approved allowances.
                </p>
              </ul>
            </div>
            <div className="pl-10 mt-2 text-medium">
            <li><span className="text-primary-orange-light">State Managers and Desk Officers:</span> ₦1,200,000 Basic/Annum</li>
            <li><span className="text-primary-orange-light">Dep State Manager and Dep State Desk Officer:</span> <span className="text-primary-orange">₦840,000</span>Basic/Annum</li>
            <li><span className="text-primary-orange-light">Other State Officials:</span> <span className="text-primary-orange">₦600,000</span>Basic/Annum</li>
            <li><span className="text-primary-orange-light">LG Manager/Desk Officer:</span> <span className="text-primary-orange">₦720,000</span>Basic/Annum</li>
            <li><span className="text-primary-orange-light">LG Dep Manager/Dep Desk Officer:</span> <span className="text-primary-orange">₦480,000</span>Basic/Annum</li>
            <li><span className="text-primary-orange-light">Other LG Officials:</span> <span className="text-primary-orange">₦360,000</span>Basic/Annum</li>
            <li>All positions come with contributory pension plans for post-engagement welfare program upon confirmation after 3 months probation.</li>
            <li>All positions come with allowances for airtime and data upon confirmation after 3 months probation.</li>

            </div>
          </div>
          <div className="mt-4">
            <div className="text-xl font-bold underline">Condition of service</div>
            <ul className="list-none my-4 pl-10 text-medium font-medium">
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
      <div className="flex flex-col bg-gray-950 p-10 py-18 text-black h-screen max-w-full">
      <BentoGridSecondDemo />
      <div className="text-white mt-4 w-full p-4">
      <h1>Do you want to re-apply instead? If so, <Link href="/apply/openings/staff/re-apply/categories" className="text-primary-orange-light underline font-semibold cursor-pointer">Click Here</Link></h1>
      </div>
      </div>
    </div>
  );
}
