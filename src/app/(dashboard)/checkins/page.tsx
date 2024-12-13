import Pagination from "@/app/ui_dashboard/checkins/pagination";
import Search from "@/app/ui_dashboard/search";
import Table from "@/app/ui_dashboard/checkins/table";
import { CreateCheckin } from "@/app/ui_dashboard/checkins/buttons";
import { lusitana } from "@/app/ui_dashboard/fonts";
import { Suspense } from "react";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = (await params).id;

  return {
    title: "Registro Jornada",
  };
}

export default async function Page({ params, searchParams }: Props) {
  const totalPages = 10;
  const currentPage = Number(searchParams?.page) || 1;

  //TODO: Search implemetation:
  const query = "";

  return (
    <Suspense>
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl`}>
            Registros de jornada
          </h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Buscar..." />
          <CreateCheckin />
        </div>
        <Suspense key={query + currentPage}>
          <Table query={query} currentPage={currentPage} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </Suspense>
  );
}
