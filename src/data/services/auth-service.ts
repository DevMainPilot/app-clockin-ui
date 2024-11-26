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

    console.log("registerUserService response: " ,response );
    console.log("registerUserService response: " ,userData );


    return response.json();
  } catch (error) {
    console.error("Registration Service Error:", error);
  }
}

interface LoginUserProps {
  username: string;
  password: string;
}

export async function loginUserService2(userData: LoginUserProps) {
  const url = new URL("/auth/login", baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error test:", errorData.detail);
      return null;
    }

    const responseData = await response.json();

    console.log("loginUserService response: " ,responseData);
    console.log("loginUserService response: " ,userData  );

    // cookies().set("jwt", responseData.access_token);

    return responseData;
  } catch (error) {
    console.error("Login Service Error:", error);
    throw error;
  }
}


export async function loginUserService(userData: LoginUserProps) {
  const url = new URL("/auth/login", baseUrl);

  try {


    if (userData.username != "testUser" ) {

      return null;
    }

    const responseData = response_debug;

    console.log("loginUserService response: " ,responseData);
    console.log("loginUserService response: " ,userData  );

    // cookies().set("jwt", responseData.access_token);

    return responseData;

  } catch (error) {
    console.error("Login Service Error:", error);
    throw error;
  }
}

