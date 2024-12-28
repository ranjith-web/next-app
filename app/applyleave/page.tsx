import { lusitana } from '@/app/components/fonts';

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Apply Leave
      </h1>
    </main>
  );
}
