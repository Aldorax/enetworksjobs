import { type Metadata } from "next";
import { useConfig } from "@/hooks/use-config";
import { ThemeWrapper } from "@/components/theme-wrapper";
import "../../../../../public/registry/themes.css";
import { Announcement } from "@/components/announcement";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { ThemeCustomizer } from "@/components/theme-customizer";
import { ThemesTabs } from "./tabs";

export const metadata: Metadata = {
  title: "Themes",
  description: "Hand-picked themes that you can copy and paste into your apps.",
};

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
import { ProfileForm } from "./forms/profile-form";
import { SidebarNav } from "./forms/components/sidebar-nav";
import { Button } from "@/registry/new-york/ui/button";
import { Checkbox } from "@/registry/new-york/ui/checkbox";
import { Input } from "@/registry/new-york/ui/input";
import { Label } from "@/registry/new-york/ui/label";
import React from "react";
import TaskPage from "@/tasks/page";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function DashboardPage() {
  return (
    <>
      <div className="h-full min-h-screen flex-col bg-white text-black md:flex">
        <div className="z-[990] border-b bg-white fixed w-full">
          <div className="flex h-16 items-center px-4 text-black">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6 mt-20">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            {/* <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button>Download</Button>
            </div> */}
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="salaries" disabled>
                Salaries
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value="staffs">Staffs</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Overall Total No of Staffs
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="text-muted-foreground h-4 w-4"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">10</div>
                    <p className="text-muted-foreground text-xs">
                      +100.0% overall
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Overall Total No of Field Officers
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="text-muted-foreground h-4 w-4"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+5</div>
                    <p className="text-muted-foreground text-xs">
                      +50.0% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Overall Total No of Nominated field officers
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="text-muted-foreground h-4 w-4"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+5</div>
                    <p className="text-muted-foreground text-xs">
                      +50% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total paid salary
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground h-4 w-4"
                      strokeWidth="2"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+20</div>
                    <p className="text-muted-foreground text-xs">Monthly</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Overall Total Onboarding by staffs
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="text-muted-foreground h-4 w-4"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">10</div>
                    <p className="text-muted-foreground text-xs">
                      +100.0% overall
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Overall Total Onboarding by field officers
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="text-muted-foreground h-4 w-4"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+5</div>
                    <p className="text-muted-foreground text-xs">
                      +50.0% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Overall Total Onboarding by nominated field officers
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="text-muted-foreground h-4 w-4"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+5</div>
                    <p className="text-muted-foreground text-xs">
                      +50% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total pending salary
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground h-4 w-4"
                      strokeWidth="2"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+20</div>
                    <p className="text-muted-foreground text-xs">Monthly</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Onboardings</CardTitle>
                    <CardDescription>
                      You onboarded 5 users so far this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Onboardings</CardTitle>
                    <CardDescription>
                      You onboarded 5 users so far this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Onboardings</CardTitle>
                    <CardDescription>
                      You onboarded 5 users so far this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="staffs" className="space-y-4">
              <TaskPage />
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
