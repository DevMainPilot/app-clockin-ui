"use server";

import SideNav from "@/app/ui_dashboard/dashboard/sidenav";
import { SignOutForm } from "@/components_auth/custom/sign-out-form";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/app/(auth)/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">

            <div className="flex w-full items-center justify-between">
              <h1>
                Usuario: <strong>{session.user.id}</strong>
              </h1>
            </div>

          <SignOutForm />
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>

      </div>
    </SessionProvider>

  );
}
