"server-only";

import {
  registerUserAction , loginUserAction
} from "@/data/actions/auth-actions";



export async function createUser(username: string, password: string, rol: string) {

  try {

      console.log("----createUser method pre" );

      const responseData = await registerUserAction(username , password , rol );

       console.log("----createUser method post" );

      return "";

  } catch (error) {
  }


}


export async function getUser(username: string, password: string){
  try {

      console.log("----getUser method pre" );

      const responseData = await loginUserAction (username , password );

       console.log("----getUser method post" );

    return responseData;

  } catch (error) {
    console.error("Failed to get user from api");
    //throw error;
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

