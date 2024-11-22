
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




export async function loginUserService(userData: LoginUserProps) {

  const url = new URL("/auth/login", baseUrl);

  console.log("--------loginUserService call URL: ", url);


  console.log("--------loginUserService call URL: ", userData);


  console.log("--------loginUserService call URL: ", JSON.stringify({ ...userData }));

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

  if (!response.ok) {
    const errorData = await response.json(); // Obtener datos de error del cuerpo de la respuesta
    console.error("Error test:", errorData.detail);
    //return { error: errorData.detail };
    return null;
    //throw new Error('Error ${response.status}: ${errorData.detail}');

  }

    const responseData = await response.json();

    console.log("-----------loginUserService responseData-------------: ", responseData  );

    return responseData ;

  } catch (error) {
    console.error("Login Service Error:", error);
    throw error;
  }
}

