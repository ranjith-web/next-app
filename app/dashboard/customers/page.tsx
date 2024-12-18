import { Metadata } from 'next';
import Content from './content';

export const metadata: Metadata = {
    title: 'Customers',
};

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';

    return (
        <main>
            <Content query={query} />
        </main>
    );
}