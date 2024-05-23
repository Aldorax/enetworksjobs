"use client";
import useSWR from "swr";
import { fetcher } from "@/utils/apiUtils";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs";
import { MainNav } from "./components/main-nav";
import { Overview } from "./components/overview";
import { RecentSales } from "./components/recent-sales";
import { UserNav } from "./components/user-nav";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  MoreVertical,
  Truck,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/registry/new-york/ui/pagination";
import { Separator } from "@/registry/new-york/ui/separator";
import { Input } from "@/registry/new-york/ui/input";
import { Checkbox } from "@/registry/new-york/ui/checkbox";
import { Label } from "@/registry/new-york/ui/label";
import Analytics from "./components/analytics";

interface StaffData {
  monthly_target: number;
  referrals_this_month: number;
  referrals_this_week: number;
  referrals_today: number;
  total_referrals: number;
  user_id: string;
}
interface Referral {
  id: number;
  monthly_target: number;
  total_referrals_completed: number;
  user_id: string;
}

interface SuccessfulReferral {
  id: number;
  referral_id: number | null;
  referred_user_card_number: string;
  referred_user_email: string;
  referred_user_name: string;
  referrer_id: string;
  timestamp: string;
  validity: boolean;
}

interface StaffData {
  full_name: string;
  id: string;
  office_status: boolean;
  referral: Referral;
  successful_referrals: SuccessfulReferral[];
}

interface AnotherData {
  monthly_target: string;
  referrals_this_month: string;
  referrals_this_week: string;
  referrals_today: string;
  total_referrals: string;
  user_id: string;
}

export type Payment = {
  id: string;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  date: string;
};

export default function DashboardPage() {
  const {
    data: staff,
    error: staffError,
    isValidating: isStaffValidating,
  } = useSWR<StaffData>(
    "https://enetworks-tovimikailu.koyeb.app/staff/dashboard",
    fetcher
  );
  const {
    data: referrals,
    error: anotherError,
    isValidating: isAnotherValidating,
  } = useSWR<AnotherData>(
    "https://enetworks-tovimikailu.koyeb.app/staff/referral",
    fetcher
  );

  if (staffError) {
    return <div>{staffError.message}</div>;
  }

  if (anotherError) {
    return <div>{anotherError.message}</div>;
  }

  if (!staff || !referrals) {
    return null;
  }

  return (
    <>
      <div className="h-full min-h-screen flex-col bg-white text-black md:flex">
        <div className="z-[990] border-b bg-white">
          <div className="flex h-16 items-center px-4 text-black">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-3 md:p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              {/* <TabsTrigger value="reports">Reports</TabsTrigger> */}
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Onboarding
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {referrals.total_referrals}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +0.00% overall
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Current Week onboards
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      +{referrals.referrals_this_week}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +0.00% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Current monthly users onboarded
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      +{referrals.referrals_this_month}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +0.00% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Default onboarding target
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">50</div>
                    <p className="text-xs text-muted-foreground">Monthly</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Onboards</CardTitle>
                    <CardDescription>
                      You carried out {referrals.referrals_this_month} onboards
                      this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="rounded-md border overflow-x-scroll">
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <Analytics />
            </TabsContent>
            <TabsContent value="reports" className="space-y-4">
              <div className="grid gap-4">
                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-05-chunk-4"
                >
                  <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                      <CardTitle className="group flex items-center gap-2 text-lg">
                        Order Oe31b70H
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <Copy className="h-3 w-3" />
                          <span className="sr-only">Copy Order ID</span>
                        </Button>
                      </CardTitle>
                      <CardDescription>Date: November 23, 2023</CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      <Button size="sm" variant="outline" className="h-8 gap-1">
                        <Truck className="h-3.5 w-3.5" />
                        <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                          Track Order
                        </span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-3.5 w-3.5" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Export</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Trash</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
                      <div className="font-semibold">Order Details</div>
                      <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Glimmer Lamps x <span>2</span>
                          </span>
                          <span>250.00</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Aqua Filters x <span>1</span>
                          </span>
                          <span>49.00</span>
                        </li>
                      </ul>
                      <Separator className="my-2" />
                      <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Subtotal
                          </span>
                          <span>299.00</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Shipping
                          </span>
                          <span>5.00</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">Tax</span>
                          <span>25.00</span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                          <span className="text-muted-foreground">Total</span>
                          <span>329.00</span>
                        </li>
                      </ul>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-3">
                        <div className="font-semibold">
                          Shipping Information
                        </div>
                        <address className="grid gap-0.5 not-italic text-muted-foreground">
                          <span>Liam Johnson</span>
                          <span>1234 Main St.</span>
                          <span>Anytown, CA 12345</span>
                        </address>
                      </div>
                      <div className="grid auto-rows-max gap-3">
                        <div className="font-semibold">Billing Information</div>
                        <div className="text-muted-foreground">
                          Same as shipping address
                        </div>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid gap-3">
                      <div className="font-semibold">Customer Information</div>
                      <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">Customer</dt>
                          <dd>Liam Johnson</dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">Email</dt>
                          <dd>
                            <a href="mailto:">liam@acme.com</a>
                          </dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">Phone</dt>
                          <dd>
                            <a href="tel:">+1 234 567 890</a>
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid gap-3">
                      <div className="font-semibold">Payment Information</div>
                      <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                          <dt className="flex items-center gap-1 text-muted-foreground">
                            <CreditCard className="h-4 w-4" />
                            Visa
                          </dt>
                          <dd>**** **** **** 4532</dd>
                        </div>
                      </dl>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                    <div className="text-xs text-muted-foreground">
                      Updated{" "}
                      <time dateTime="2023-11-23">November 23, 2023</time>
                    </div>
                    <Pagination className="ml-auto mr-0 w-auto">
                      <PaginationContent>
                        <PaginationItem>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-6 w-6"
                          >
                            <ChevronLeft className="h-3.5 w-3.5" />
                            <span className="sr-only">Previous Order</span>
                          </Button>
                        </PaginationItem>
                        <PaginationItem>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-6 w-6"
                          >
                            <ChevronRight className="h-3.5 w-3.5" />
                            <span className="sr-only">Next Order</span>
                          </Button>
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="settings" className="space-y-4">
              <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-full gap-2">
                  <h1 className="text-3xl font-semibold">Settings</h1>
                </div>

                <Tabs
                  defaultValue="profile"
                  className="grid w-full grid-cols-1 gap-4 space-y-4 text-sm text-muted-foreground md:grid-cols-5"
                  x-chunk="dashboard-04-chunk-0"
                >
                  <TabsList className="mx-auto grid w-full max-w-full grid-cols-2 items-start gap-6 md:grid-cols-1">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="profile"
                    className="col-span-4 w-full space-y-4"
                  >
                    <div className="grid gap-6">
                      <Card x-chunk="dashboard-04-chunk-1">
                        <CardHeader>
                          <CardTitle>Change your Password</CardTitle>
                          <CardDescription>
                            Use the form below to Update / Change your Password
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <form className="grid gap-2">
                            <Input placeholder="Old Password" />
                            <Input placeholder="New Password" />
                            <Input placeholder="Confirm New Password" />
                          </form>
                        </CardContent>
                        <CardFooter className="border-t px-6 py-4">
                          <Button>Save</Button>
                        </CardFooter>
                      </Card>
                      <Card x-chunk="dashboard-04-chunk-2">
                        <CardHeader>
                          <CardTitle>Profile Information</CardTitle>
                          <CardDescription>
                            Some details about yourself
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <form className="flex flex-col gap-4">
                            <Label>Full Name</Label>
                            <Input
                              placeholder="Full Name"
                              defaultValue="Emmanuel Appah"
                              disabled
                            />
                            <Label>Position</Label>
                            <Input
                              placeholder="Position"
                              defaultValue="Staff Manager"
                              disabled
                            />
                            <div className="flex items-center space-x-2">
                              <Checkbox id="include" defaultChecked />
                              <label
                                htmlFor="include"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Recieve Notification whenever a change is made
                              </label>
                            </div>
                          </form>
                        </CardContent>
                        <CardFooter className="border-t px-6 py-4">
                          <Button>Save</Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="settings"
                    className="col-span-4 w-full space-y-4"
                  >
                    <div className="grid gap-6">
                      <Card
                        className="sm:col-span-2"
                        x-chunk="dashboard-05-chunk-0"
                      >
                        <CardHeader className="pb-3">
                          <CardTitle className="text-xl">Log out</CardTitle>
                          <CardDescription className="max-w-lg text-balance leading-relaxed">
                            Log out of yout account
                          </CardDescription>
                        </CardHeader>
                        <CardFooter>
                          <Button variant="destructive">Log Out</Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </main>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
