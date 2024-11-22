
import { getBaseURL } from "@/lib/utils";

const baseUrl = getBaseURL();

interface RegisterUserProps {
  username: string;
  password: string;
  role: string;
}

export async function registerUserService(userData: RegisterUserProps) {

  const url = new URL("/auth/register", baseUrl);

    console.log("----registerUserService url: " , url);

    console.log("----registerUserService userdata: ", userData );

    console.log("----registerUserService userdata json: ", JSON.stringify({ ...userData }) );

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ ...userData }),
      //cache: "no-cache",
    });

    console.log("----registerUserService method post" );

    return response.json();
  } catch (error) {
    console.error("Registration Service Error:", error);
  }
}