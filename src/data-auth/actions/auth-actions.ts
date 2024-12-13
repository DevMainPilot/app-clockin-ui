"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  registerUserService,
  loginUserService,
} from "@/data-auth/services/auth-service";

const config = {
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

export async function registerUserAction(
  email: string,
  password: string,
  rol: string
) {
  const validatedFields = {
    username: email,
    password: password,
    role: rol,
  };

  const responseData = await registerUserService(validatedFields);

  if (responseData.error) {
    return "Failed register.";
  }

  redirect("/dashboard");
}

export async function loginUserAction(username: string, password: string) {
  const validatedFields = {
    username: username,
    password: password,
  };

  try {
    const responseData = await loginUserService(validatedFields);

    return responseData;
  } catch (error) {}
}

export async function createUser(
  username: string,
  password: string,
  rol: string
) {
  try {
    const responseData = await registerUserAction(username, password, rol);
    return "";
  } catch (error) {}
}

export async function getUser(username: string, password: string) {
  try {
    const responseData = await loginUserAction(username, password);
    return responseData;
  } catch (error) {
    console.error("Failed to get user from api");
  }
}
