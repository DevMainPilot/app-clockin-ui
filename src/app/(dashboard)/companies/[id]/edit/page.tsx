import Form from '@/app/ui/companies/edit-form';
import Breadcrumbs from '@/app/ui/companies/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
import { notFound } from 'next/navigation';


export default async function Page({ params }: { params: { id: string } }) {

    const id = params.id;

    const [invoice, customers] : [InvoiceForm | undefined , CustomerField[] | undefined] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers(),
      ]);

    if (!invoice) {
        notFound();
    }

    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Companies', href: '/companies' },
            {
                label: 'Edit Companies',
                href: `/companies/${id}/edit`,
                active: true,
            },
            ]}
        />
        <Form invoice={invoice!} customers={customers} />
        </main>
    );
}