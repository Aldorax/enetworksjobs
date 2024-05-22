"use client";
import useSWR from "swr";
import { fetcher } from "@/utils/apiUtils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/new-york/ui/table";
import Link from "next/link";

interface AnotherData {
  id: number;
  referral_id: string;
  referred_user_card_number: string;
  referred_user_email: string;
  referred_user_name: string;
  referrer_id: string;
  timestamp: string;
  validity: true;
}

interface Success {
  info: AnotherData[];
}

export function RecentSales() {
  const {
    data: referrals,
    error: anotherError,
    isValidating: isAnotherValidating,
  } = useSWR<Success>(
    "https://enetworks-tovimikailu.koyeb.app/staff/successful_referrals",
    fetcher
  );

  if (anotherError) {
    return <div>{anotherError.message}</div>;
  }

  if (!referrals) {
    return null;
  }

  return (
    <Table>
      <TableCaption>A list of your recent Onboards.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Full name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>TimeStamp</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {referrals?.map((onboard) => (
          <TableRow key={onboard.id}>
            <TableCell className="font-medium">{onboard.id}</TableCell>
            <TableCell className="font-medium">
              {onboard.referred_user_name}
            </TableCell>
            <TableCell>{onboard.referred_user_email}</TableCell>
            <TableCell>{onboard.timestamp}</TableCell>
            <TableCell className="text-right">
              {onboard.validity == true ? "True" : "False"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>
            This table shows some of the recent onboardings
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
