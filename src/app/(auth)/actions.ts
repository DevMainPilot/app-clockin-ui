"use server";

import { z } from "zod";

import { createUser, getUser } from "@/db/queries";

import { signIn } from "./auth";

const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export interface LoginActionState {
  status: "idle" | "in_progress" | "success" | "failed" | "invalid_data";
}

export const login = async (
  _: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }

    return { status: "failed" };
  }
};

export interface RegisterActionState {
  status:
    | "idle"
    | "in_progress"
    | "success"
    | "failed"
    | "user_exists"
    | "invalid_data";
}

export const register = async (
  _: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState> => {

    console.log("----register" );

  try {

    const validatedData = {
            username: formData.get("email") ,
            password: formData.get("password"),
            role: formData.get("rol") ,
        }
    ;
    console.log("----register validatedData" );

    // let [user] = await getUser(validatedData.email);
    //let [user] = false ;

    console.log("----register 2" );

    //if (false) {
    //  return { status: "user_exists" } as RegisterActionState;
    //} else {

      console.log("----pre createUser" );

      await createUser(validatedData.username, validatedData.password, validatedData.role);

      console.log("----createUser" );

      //await signIn("credentials", {
      //  email: validatedData.email,
      //  password: validatedData.password,
      //  redirect: false,
      //});

      return { status: "success" };
   // }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }

    return { status: "failed" };
  }
};
