import { getBaseURL } from "@/lib/utils";
import { cookies } from "next/headers";

const baseUrl = getBaseURL();

interface RegisterUserProps {
  username: string;
  password: string;
  role: string;
}

const response_debug = [
  {

    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJoZWN0b3IiLCJleHAiOjE3MzI2Mzg4OTl9.k3ttgKU-oC27A9rmb1UiaH7RClxo9AyrbEgVIIkDODI',
    token_type: 'bearer',
  },
];


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
        //"Content-Type": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
        //"Accept": "application/json",
      },
      //body: JSON.stringify({ ...userData }),
      body: new URLSearchParams({ username: userData.username, password: userData.password, }).toString(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error with login:", errorData.detail);
      return null;
    }

    const responseData = await response.json();

    console.log("------Login Service response:", responseData);

    // cookies().set("jwt", responseData.access_token);

    responseData["userdata"] = userData.username

    return responseData;
  } catch (error) {
    console.error("Login Service Error:", error);
    return null;
    //throw error;
  }
}

