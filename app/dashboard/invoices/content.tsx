"use client";

import { fetchFilteredInvoicesStatic, fetchInvoicesPagesStatic } from '@/app/lib/data';
import Pagination from '@/app/ui/invoices/pagination';
import Table from '@/app/ui/invoices/table';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/lib/store';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

function Content({ currentPage, query }: { currentPage: number; query: string}) {
    const invoiceState = useSelector((state: RootState) => state.invoices);
    const invoices = fetchFilteredInvoicesStatic(query, currentPage, invoiceState);
    const totalPages = fetchInvoicesPagesStatic(query, invoiceState);
    return (
        <>
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <Table data={invoices} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </>
    );
}

export default Content;