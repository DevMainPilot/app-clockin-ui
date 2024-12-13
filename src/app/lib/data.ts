// This code is only for test data
// import { sql } from '@vercel/postgres';

//   In case you use LOCAL configuration Vercel PostgreSQL DB
//   https://vercel.com/docs/storage/vercel-postgres/local-development
// import { sql } from '@/db';

import { User } from "./definitions";
import { formatCurrency } from "./utils";
import { unstable_noStore as noStore } from "next/cache";
import { getBaseURL } from "@/lib/utils";

import { auth } from "@/app/(auth)/auth";

const baseUrl = getBaseURL();

export async function fetchFilteredCheckins(
  query: string,
  currentPage: number
) {
  noStore();
  try {
    const session = await auth();
    const skip = currentPage;
    const url = new URL(`/clock/clock_in?skip=${skip} `, baseUrl);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${session.user.username}`,
      },
    });

    if (!response.ok) {
      console.log("response was not ok: ", response);
      return [];
    }

    const data: Clockin[] = await response.json();
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch clockins.");
  }
}
