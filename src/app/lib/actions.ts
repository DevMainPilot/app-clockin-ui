"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getBaseURL } from "@/lib/utils";
//import { signIn } from '@/auth';
import { auth } from "@/app/(auth)/auth";

const baseUrl = getBaseURL();

const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string(),
});

const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

//export async function createInvoice2(prevState: State, formData: FormData) {

export async function createInvoice(formData: FormData): Promise<State> {
  return { errors: {}, message: "Invoice created successfully" };
}

export async function createInvoice_back(formData: FormData): Promise<State> {
  // Validate form fields using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  // Test it out:
  // console.log();
  // Insert data into the database
  try {
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath("/invoices");
  redirect("/invoices");

  return { errors: {}, message: "Invoice created successfully" };
}

// Use Zod to update the expected types
const UpdateInvoice = InvoiceSchema.omit({ id: true, date: true });

// ...

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData
) {
  // Validate form fields using Zod
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  // Insert data into the database
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." };
  }
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath("/invoices");
  redirect("/invoices");
}

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

  console.log("------------------data: ", data_form);

  const session = await auth();
  data_form.user_id = session.user.id;

  console.log("------------------session handleRegister: ", session.user.id);

  console.log(
    "------------------session handleRegister: ",
    session.user.username
  );

  try {
    const url = new URL("/clock/clock_in", baseUrl);

    const methodOnly = { method: data_form.method };

    // Registra los detalles de la solicitud
    console.log("methodOnly: ", methodOnly);
    console.log("Headers: ", {
      //"Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json",
       "Content-Type": "application/json",
      Authorization: `Bearer ${session.user.username}`,
    });

    console.log("Body: ", JSON.stringify(methodOnly));

    const response = await fetch(url, {
      method: "POST",
      headers: {
        //"Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.username}`, // Usa el token de acceso correcto
      },
      body: JSON.stringify(methodOnly) // Formatear correctamente los datos
      //body: new URLSearchParams({ method: data_form.method  }).toString(),

      //body: new URLSearchParams(methodOnly).toString(), // Formatear correctamente los datos
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

  redirect("/companies");
}

export async function deleteCheckin(id: string) {

      const session = await auth();

  try {
    //const url = new URL("/clock/clock_in/", baseUrl);
    const url = new URL(`/clock/clock_in/${id}`, baseUrl);

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
       // "Content-Type": "application/json",
      //  Accept: "application/json",

              "Accept": "application/json",
       "Content-Type": "application/json",
      Authorization: `Bearer ${session.user.username}`,

      },
      //body: JSON.stringify(data_form),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: Clockin[] = await response.json();

    // Revalidate the cache if needed
    revalidatePath("/companies"); // Redirecciona antes de finalizar la función
    redirect("/");
  } catch (error) {
    return { message: "Database Error: Failed to Delete." };
  }
}

export async function deleteInvoice(id: string) {
  // throw new Error('Failed to Delete Invoice');
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath("/dashboard/invoices");
  } catch (error) {
    return { message: "Database Error: Failed to Delete Invoice." };
  }
}
