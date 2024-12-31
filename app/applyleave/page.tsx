import { lusitana } from '@/app/components/fonts';

export default async function Page() {
  return (
    <main>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Apply Leave Coming soon...
        </h1>
      </div>
    </main>
  );
}
