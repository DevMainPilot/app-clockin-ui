import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice ,deleteCheckin } from '@/app/lib/actions';

export function CreateCheckin() {
  return (
    <Link
      href="/checkins/create"
      className="flex h-10 items-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
    >
      <span className="hidden md:block">Crear registro de jornada</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

//TODO:
export function UpdateCheckin({ id }: { id: string }) {
    const isDisabled = true; // Cambia esta condición según sea necesario

  return (
    <Link
      href={`/checkins/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100 cursor-not-allowed"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}



export function DeleteCheckin({ id }: { id: string }) {

  const deleteCheckinWithId = deleteCheckin.bind(null, id);

  return (
    <form action={deleteCheckinWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Borrar</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
