"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { AuthForm } from "@/components_auth/custom/auth-form-register";
import { SubmitButton } from "@/components_auth/custom/submit-button";

import { register, RegisterActionState } from "../actions";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [state, formAction] = useActionState<RegisterActionState, FormData>(
    register,
    {
      status: "idle",
    }
  );

  useEffect(() => {
    if (state.status === "user_exists") {
      toast.error("La cuenta ya existe");
    } else if (state.status === "failed") {
      toast.error("No se pudo crear la cuenta");
    } else if (state.status === "invalid_data") {
      toast.error("¡Falló la validación de tu envío!");
    } else if (state.status === "success") {
      toast.success("Cuenta creada con éxito");
      router.refresh();
    }
  }, [state, router]);


  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get("email") as string);
    formAction(formData);
  };

  // Dark mode :
  // <h3 className="text-xl font-semibold dark:text-zinc-50">Iniciar login</h3> </div>

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl gap-12 flex flex-col">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="text-xl font-semibold light:text-zinc-50">Registrar usuario</h3>
        </div>
        <AuthForm action={handleSubmit} defaultEmail={email}>
          <SubmitButton>Registrar</SubmitButton>
          <p className="text-center text-sm text-gray-600 mt-4 light:text-zinc-400">
            {"Ir al "}
            <Link href="/login" className="font-semibold text-gray-800 hover:underline light:text-zinc-200">
              Login
            </Link>
          </p>
        </AuthForm>
      </div>
    </div>
  );
}
