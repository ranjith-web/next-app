"use client";
import Form from '@/app/components/invoices/create-form';
import Breadcrumbs from '@/app/components/invoices/breadcrumbs';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/lib/store';

export default function Page() {
    const customers = useSelector((state: RootState) => state.customers);
    
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Invoices', href: '/dashboard/invoices' },
                    {
                        label: 'Create Invoice',
                        href: '/dashboard/invoices/create',
                        active: true,
                    },
                ]}
            />
            <Form customers={customers} />
        </main>
    );
}