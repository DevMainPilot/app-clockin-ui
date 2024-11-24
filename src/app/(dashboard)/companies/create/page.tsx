import Form from '@/app/ui/companies/create-form';
import Breadcrumbs from '@/app/ui/companies/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Companies', href: '/companies' },
          {
            label: 'Create companies',
            href: '/companies/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}