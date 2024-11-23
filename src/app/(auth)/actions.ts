"use server";

import { z } from "zod";
import { createUser, getUser } from "@/calls/calls";
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
    const validatedData = {
      username: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    await signIn("credentials", {
      email: validatedData.username,
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
  try {
    const validatedData = {
      username: formData.get("email") as string,
      password: formData.get("password") as string,
      role: formData.get("rol") as string,
    };

    const validated = false;  // Simulación de validación

    if (validated) {
      return { status: "user_exists" } as RegisterActionState;
    } else {
      await createUser(validatedData.username, validatedData.password, validatedData.role);

      await signIn("credentials", {
        email: validatedData.username,
        password: validatedData.password,
        redirect: false,
      });

      return { status: "success" };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }

    return { status: "failed" };
  }
};
