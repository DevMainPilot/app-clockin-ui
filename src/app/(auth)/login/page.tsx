"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { AuthFormLogin } from "@/components_auth/custom/auth-form-login";
import { SubmitButton } from "@/components_auth/custom/submit-button";

import { login, LoginActionState } from "../actions";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [state, formAction] = useActionState<LoginActionState, FormData>(
    login,
    {
      status: "idle",
    }
  );

  useEffect(() => {
    if (state.status === "failed") {
      toast.error("¡Credenciales inválidas!");
    } else if (state.status === "invalid_data") {
      toast.error("¡Falló la validación de tu envío!");
    } else if (state.status === "success") {
      router.refresh();
    }
  }, [state.status, router]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get("email") as string);
    formAction(formData);
  };

  // Dark mode example:
  // <h3 className="text-xl font-semibold dark:text-zinc-50">Iniciar login</h3> </div>

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
	<div className="w-full max-w-md overflow-hidden rounded-2xl flex flex-col gap-12">
		<div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
			<h3 className="text-xl font-semibold light:text-zinc-50">Iniciar login</h3> </div>
		<AuthFormLogin action={handleSubmit} defaultEmail={email}>
			<SubmitButton>Enviar</SubmitButton>
			<p className="text-center text-sm text-gray-600 mt-4 light:text-zinc-400"> {"Registro "}
				<Link href="/register" className="font-semibold text-gray-800 hover:underline light:text-zinc-200"> Crear cuenta </Link>
			</p>
		</AuthFormLogin>
	</div>
</div>
  );
}
