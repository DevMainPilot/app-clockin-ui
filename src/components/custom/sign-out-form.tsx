import Form from 'next/form';

import { signOut } from '@/app/(auth)/auth';
import { cookies } from "next/headers";

export const SignOutForm = () => {
  return (<Form className="w-full" action={async ()=> {

      'use server';

       console.log(" -----SignOutForm ");

        const cookieHandler = await cookies();
        cookieHandler.set("jwt", "", {
          path: "/",
          maxAge: -1,
        });

        await signOut({ redirectTo: '/', });

        }} >
	<button type="submit" className="w-full text-left px-1 py-0.5 text-red-500"> Desconectar </button>
</Form>
  );
};
