//https://heroicons.com/
import { CubeIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function MainLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <CubeIcon className="h-100 w-100 rotate-[15deg]" />

      <p className="text-[15px]">Consulting Engineering tech solutions</p>
    </div>
  );
}



