import Form from '@/app/ui_dashboard/checkins/create-form';
import Breadcrumbs from '@/app/ui_dashboard/checkins/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Registro', href: '/checkins' },
          {
            label: 'Insertar nuevo registro',
            href: '/checkins/create',
            active: true,
          },
        ]}
      />
      <Form   />
    </main>
  );
}