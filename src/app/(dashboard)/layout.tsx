import { SignOutForm } from "@/components/custom/sign-out-form";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Dashboard</h1>
      <SignOutForm />
    </div>
  );
}
