import Image from 'next/image';
import { UpdateCheckin, CreateCheckin,DeleteCheckin } from '@/app/ui_dashboard/checkins/buttons';
import CheckinStatus from '@/app/ui_dashboard/checkins/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredCheckins } from '@/app/lib/data';
export default async function CheckinsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {

  const checkins = await fetchFilteredCheckins(query, currentPage);

  if (!Array.isArray(checkins)) {
      //TODO:
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">

          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Id registro
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Usuario
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Métode
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Fecha
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {checkins?.map((checkin) => (
                <tr
                  key={checkin.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{checkin.id}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {checkin.user_id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    { checkin.method }
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                   { new Date(checkin.timestamp).toLocaleString() }
                  </td>

                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateCheckin id={checkin.id} />
                      <DeleteCheckin id={checkin.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
