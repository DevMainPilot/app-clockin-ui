import { getBaseURL } from "@/lib/utils";
import { cookies } from "next/headers";

const baseUrl = getBaseURL();

interface RegisterUserProps {
  username: string;
  password: string;
  role: string;
}

export async function registerUserService(userData: RegisterUserProps) {
  const url = new URL("/auth/register", baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    });

    return response.json();
  } catch (error) {
    console.error("Registration Service Error:", error);
  }
}

interface LoginUserProps {
  username: string;
  password: string;
}

export async function loginUserService(userData: LoginUserProps) {
  const url = new URL("/auth/login", baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({ username: userData.username, password: userData.password, }).toString(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error with login:", errorData.detail);
      return null;
    }

    const responseData = await response.json();
    responseData["userdata"] = userData.username

    return responseData;
  } catch (error) {
    return null;
  }
}

