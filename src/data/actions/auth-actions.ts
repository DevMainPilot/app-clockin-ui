"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  registerUserService,
  loginUserService,
} from "@/data/services/auth-service";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

export async function registerUserAction(email: string, password: string, rol: string) {

 console.log("----registerUserAction method pre" );

  const validatedFields = {
      username: email,
      password: password,
      role: rol
  };

  console.log("----registerUserService method pre" );

  const responseData = await registerUserService(validatedFields);

  //cookies().set("jwt", responseData.jwt, config);

  redirect("/dashboard");
}
