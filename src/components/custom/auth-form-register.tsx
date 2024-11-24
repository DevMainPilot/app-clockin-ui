import Form from 'next/form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export function AuthForm({
  action,
  children,
  defaultEmail = '',
}: {
  action: any;
  children: React.ReactNode;
  defaultEmail?: string;
}) {
  return (<Form action={action} className="flex flex-col gap-4 px-4 sm:px-16">
	<div className="flex flex-col gap-2">
		<Label htmlFor="email" className="text-zinc-600 font-normal light:text-zinc-400"> Usuario </Label>
		<Input id="email" name="email" className="bg-muted text-md md:text-sm" type="text" placeholder="" autoComplete="email" required defaultValue={defaultEmail} />
		<Label htmlFor="password" className="text-zinc-600 font-normal light:text-zinc-400"> Contraseña </Label>
		<Input id="password" name="password" className="bg-muted text-md md:text-sm" type="password" required />
		<Label htmlFor="rol" className="text-zinc-600 font-normal light:text-zinc-400"> Rol </Label>
		<Input id="rol" name="rol" className="bg-muted text-md md:text-sm" type="rol" required /> </div> {children} </Form>
  );
}
