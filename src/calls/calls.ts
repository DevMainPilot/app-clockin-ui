"server-only";

import { registerUserAction, loginUserAction } from "@/data/actions/auth-actions";

export async function createUser(username: string, password: string, rol: string) {
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
