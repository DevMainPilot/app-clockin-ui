"server-only";

import {
  registerUserAction
} from "@/data/actions/auth-actions";


export async function createUser(email: string, password: string, rol: string) {

  try {

      console.log("----createUser method pre" );

      const responseData = await registerUserAction(email , password , rol );

       console.log("----createUser method post" );

      return "";

  } catch (error) {
  }


}


export async function getUser(email: string){
  try {

    console.log("Enter to getUser");

    return "";

  } catch (error) {
    console.error("Failed to get user from api");
    throw error;
  }
}

export async function saveChat( ){
  try {
    return "";
  } catch (error) {
  }
}

export async function deleteChatById( ) {
  try {
      return "";
  } catch (error) {

  }
}

export async function getChatsByUserId( ){
  try {
      return "";
  } catch (error) {

  }
}

export async function getChatById( ){
  try {
      return "";
  } catch (error) {

  }
}

export async function createTables_temp( ){

  try {
      return "";
  } catch (error) {
  }
}

export async function createTables() {

  try {
      return "";
  } catch (error) {
    throw error;
  }
}

