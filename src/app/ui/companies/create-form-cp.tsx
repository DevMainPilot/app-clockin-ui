'use client';

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import {  handleRegister } from '@/app/lib/actions';
import { useFormState } from 'react-dom';



export default function Form({ customers }: { customers: CustomerField[] }) {

  const initialState = { message: "", errors: {} };

  //const [state, dispatch] = useFormState(createInvoice, initialState);

  const [state, formAction ] = useFormState(handleRegister, {})

  return (
    <form action={formAction} >
      <div className="rounded-md bg-gray-50 p-4 md:p-6">




        <div className="mb-4">
          <label htmlFor="method" className="mb-2 block text-sm font-medium">
            Método de registro (Entrada/Salida)
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="method"
                name="method"
                type="text"
                placeholder="Entrada/Salida"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/companies"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Crear registro</Button>
      </div>
    </form>
  );
}
