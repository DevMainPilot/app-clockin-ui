"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  registerUserService,
  loginUserService,
} from "@/data/services/auth-service";

const config = {
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

export async function registerUserAction(email: string, password: string, rol: string) {
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

      if (responseData===null){
          console.log(" ----loginUserAction responseData jwt null");
      }
      else{

          console.log(" -----loginUserAction responseData jwt", responseData.access_token);
          //cookies().set("jwt", responseData.access_token);

            const cookieHandler = await cookies();
            cookieHandler.set("jwt", responseData.access_token, {
              path: "/"
            });

      }


      return responseData;

  } catch (error) {

  }


}

export async function logoutAction2() {
  try {
    const cookieHandler = await cookies();
    cookieHandler.set("jwt", "", { ...config, maxAge: 0 });
  } catch (error) {
    console.error("Error al modificar la cookie:", error.message);
    throw error;
  }
}

export async function logoutAction() {
  try {
    console.log(" ----logoutAction delete jwt ");
    const cookieHandler = await cookies();
    cookieHandler.set("jwt", "", {
      path: "/login",
      maxAge: -1,
    });

    redirect("/login");
  } catch (error) {
    console.error("Error al modificar la cookie:", error.message);
    throw error;
  }
}
