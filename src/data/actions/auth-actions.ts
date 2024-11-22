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

  if (responseData.error) {
    return  "Failed register."
  }

  //cookies().set("jwt", responseData.jwt, config);

  redirect("/dashboard");
}


export async function loginUserAction(username: string, password: string ) {

    const validatedFields = {
      username: username,
      password: password
  };

  const responseData = await loginUserService(validatedFields);

  //if (responseData.error) {
  //  return  "Failed login."
  //}

  //cookies().set("jwt", responseData.access_token);

  console.log("----setJwtCookie "  + responseData);

  console.log("----setJwtCookie  responseData.access_token: "  + responseData.access_token);

cookies().set("jwt", responseData.access_token);
  //  await setJwtCookie(responseData);

    return responseData;
  //redirect("/dashboard");
}

//export async function logoutAction() {
   //   cookies().set("jwt", "", { ...config, maxAge: 0 });
  //    redirect("/");
//}

export async function logoutAction2() {
  try {

    const cookieHandler = await cookies(); // Espera la operación cookies()
    cookieHandler.set("jwt", "", { ...config, maxAge: 0 }); // Usa cookieHandler para setear la cookie

    //redirect("/");

  } catch (error) {
    console.error("Error al modificar la cookie:", error.message);
    throw error; // Lanza de nuevo el error si es necesario manejarlo en otro lugar
  }
}

export async function logoutAction() {
  try {
    const cookieHandler = await cookies(); // Espera la operación cookies()
    cookieHandler.set("jwt", "", {
      path: "/", // Asegúrate de establecer el path correcto
      maxAge: -1, // Establece la edad máxima a 0 para eliminar la cookie
    });

    // Realiza la redirección después de que la cookie haya sido configurada
     redirect("/login");
  } catch (error) {
    console.error("Error al modificar la cookie:", error.message);
    throw error; // Lanza de nuevo el error si es necesario manejarlo en otro lugar
  }
}

