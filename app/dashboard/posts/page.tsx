import { lusitana } from "@/app/components/fonts";
import Content from "./content";

export default async function Page() {
    
  return (
    <main>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
            Posts
        </h1>
        <Content />
    </main>
  );
}
