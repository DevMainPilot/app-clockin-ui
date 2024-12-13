"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getBaseURL } from "@/lib/utils";
//import { signIn } from '@/auth';
import { auth } from "@/app/(auth)/auth";

const baseUrl = getBaseURL();

// Obsolete method
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    //await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialSignin";
    }
    throw error;
  }
}

export async function handleRegister(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const data_form = Object.fromEntries(formData.entries());

  const session = await auth();
  data_form.user_id = session.user.id;

  try {
    const url = new URL("/clock/clock_in", baseUrl);

    const methodOnly = { method: data_form.method };

    console.log("Body: ", JSON.stringify(methodOnly));

    const response = await fetch(url, {
      method: "POST",
      headers: {
        //"Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.username}`,
      },
      body: JSON.stringify(methodOnly)

    });

    if (!response.ok) {
      console.error("Database Error response:", response);
      throw new Error("Network response was not ok");
    }

    const data: Clockin[] = await response.json();
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to register.");
  }

  redirect("/checkins");
}

export async function deleteCheckin(id: string) {

      const session = await auth();

  try {
    const url = new URL(`/clock/clock_in/${id}`, baseUrl);

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
              "Accept": "application/json",
       "Content-Type": "application/json",
      Authorization: `Bearer ${session.user.username}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: Clockin[] = await response.json();

    revalidatePath("/checkins"); // Redirecciona antes de finalizar la función
    redirect("/");
  } catch (error) {
    return { message: "Database Error: Failed to Delete." };
  }
}

