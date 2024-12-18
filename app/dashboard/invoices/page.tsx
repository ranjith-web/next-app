import Search from '@/app/components/search';
import { CreateInvoice } from '@/app/components/invoices/buttons';
import { lusitana } from '@/app/components/fonts';
import Content from './content';
import { getTranslations } from 'next-intl/server';

async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const translateMessage = await getTranslations("Common");
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>{translateMessage('invoices')}</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder={translateMessage('searchInvoices')} />
                <CreateInvoice />
            </div>
            <Content currentPage={currentPage} query={query} />
        </div>
    );
}

export default Page;