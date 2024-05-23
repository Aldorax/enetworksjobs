"use client";
// import { type Metadata } from "next";
import useSWR from "swr";
import { fetcher } from "@/utils/apiUtils";
import React, { useCallback, useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";
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
import { MainNav } from "./main-nav";
import { Overview } from "./overview";
import { RecentSales } from "./recent-sales";
import { UserNav } from "./user-nav";
import { Button } from "@/components/ui/button";
import { CalendarDateRangePicker } from "./date-range-picker";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  MoreHorizontal,
  MoreVertical,
  Truck,
} from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/new-york/ui/table";
import { Badge } from "@/registry/default/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/registry/new-york/ui/pagination";
import { Separator } from "@/registry/new-york/ui/separator";
import { SidebarNav } from "@/app/(admin)/admin/dashboard/forms/components/sidebar-nav";
import { Input } from "@/registry/new-york/ui/input";
import { Checkbox } from "@/registry/new-york/ui/checkbox";
import { ProfileForm } from "@/app/(admin)/admin/dashboard/forms/profile-form";
import { Label } from "@/registry/new-york/ui/label";

type PaginationState = {
  pageIndex: number;
  pageSize: number;
};
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

interface ReferralData {
  id: number;
  referral_id: string;
  referred_user_card_number: string;
  referred_user_email: string;
  referred_user_name: string;
  referrer_id: string;
  timestamp: string;
  validity: true;
}

export type Payment = {
  id: string;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  date: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "date",
    header: "Date Onboarded",
    cell: ({ row }) => <div className="capitalize">{row.getValue("date")}</div>,
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(payment.id)}
  //           >
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>
  //             <Button className="bg-primary-foreground text-black hover:text-white">
  //               View customer
  //             </Button>
  //           </DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   }
  // }
];

export default function Analytics() {
  const [mappedData, setMappedData] = useState([]);

  const {
    data: referrals1,
    error: anotherError1,
    isValidating: isAnotherValidating1,
  } = useSWR<ReferralData[]>(
    "https://enetworks-tovimikailu.koyeb.app/staff/successful_referrals",
    fetcher
  );

  const mapReferrals = useCallback(() => {
    if (Array.isArray(referrals1)) {
      const data = referrals1.map((referral) => ({
        id: referral.id.toString(),
        status: referral.validity ? "success" : "failed",
        email: referral.referred_user_email,
        date: new Date(referral.timestamp).toLocaleDateString(),
      }));
      setMappedData(data);
      console.log("Mapped data:", data);
    }
  }, [referrals1]);

  // Use effect to run the mapping function once when the component mounts
  useEffect(() => {
    mapReferrals();
  }, [mapReferrals]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: mappedData,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const pageCount = table.getPageCount();

  if (anotherError1) {
    return <div>{anotherError1.message}</div>;
  }

  if (!referrals1) {
    return null;
  }
  return (
    <>
      <div className="grid md:flex grid-cols-1 gap-2 items-center space-x-2">
        <CalendarDateRangePicker />
        <Button>Download</Button>
      </div>
      <div className="w-full">
        <div className="flex items-center gap-2 py-4">
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border overflow-x-scroll">
          <Table className="w-full overflow-x-scroll">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Page {pagination.pageIndex + 1} of {pageCount}
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
