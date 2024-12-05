'use client'

import {
  UserGroupIcon,
  IdentificationIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    { name: 'Home', href: '/', icon: HomeIcon },

   {    name: 'Registro',
      href: '/companies',
      icon: IdentificationIcon },


  // {    name: 'Customers',
   //    href: '/customers',
    //   icon: UserGroupIcon },
 //{
   //  name: 'Invoices',
   //  href: '/invoices',
    // icon: DocumentDuplicateIcon,
   //},

];

export default function NavLinks() {
  const pathname = usePathname();


  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (

          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-blue-200 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3
            ${pathname === link.href ? 'bg-blue-100 bg-blue-600' : ''}
            `}
          >
            <LinkIcon className="w-6" />

            <p className="hidden md:block">{link.name}</p>
          </Link>


        );
      })}
    </>
  );
}
