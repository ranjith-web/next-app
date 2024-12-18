"use client";

import { fetchFilteredCustomersStatic } from '@/app/lib/data';
import { RootState } from '@/app/lib/store';
import CustomersTable from '@/app/ui/customers/table';
import { Metadata } from 'next';
import { useSelector } from 'react-redux';

export const metadata: Metadata = {
    title: 'Customers',
};

export default function Content(props: {
    query?: string;
}) {
    const { query = '' } = props;
    const customerState = useSelector((state: RootState) => state.customers);
    const customers = fetchFilteredCustomersStatic(query, customerState);

    return (
        <main>
            <CustomersTable customers={customers} />
        </main>
    );
}