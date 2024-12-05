'use server';

import SideNav from '@/app/ui/dashboard/sidenav';
     import { SignOutForm } from "@/components/custom/sign-out-form";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/app/(auth)/auth"

export default async function Layout({ children }: { children: React.ReactNode }) {


     const session =  await auth()

    // v3:

    // v4:
    //const { data: session, status } = useSession()
   //const [session, loading] = useSession();


  return (
<SessionProvider>
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">

              <div className="w-full flex-none md:w-64">
              Usuario: {session.user.id} test v1
              <SignOutForm />
                <SideNav />

              </div>
              <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
                 
            </div>
</SessionProvider>
  );
}