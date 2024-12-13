
import Link from 'next/link';
import NavLinks from '@/app/ui_dashboard/dashboard/nav-links';
import MainLogo from '@/app/ui_dashboard/main-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/app/(auth)/auth';
import { cookies } from "next/headers";

export default function SideNav() {

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-center justify-center rounded-md bg-green-950 p-4 md:h-15"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <MainLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form action={async () => {
            'use server';
            await signOut({ redirectTo: '/', });

          }}>
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-green-200 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Desconectar</div>
          </button>
        </form>
      </div>
    </div>
  );
}
