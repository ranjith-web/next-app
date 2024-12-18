import SideNav from '@/app/components/dashboard/sidenav';
import { auth } from "@/auth";
import LocaleSwitcher from '@/app/components/localeSwitcher';
 
export default async function Layout({ children }: { children: React.ReactNode }) {
    const { user } = await auth();
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            {/* Sidebar */}
            <div className="w-full flex-none md:w-64">
                <SideNav userauth={user} />
            </div>

            <div className="flex-grow flex flex-col">
                <div className="flex items-center justify-end p-6 md:p-12">
                    <span>{user?.name}</span>
                    <LocaleSwitcher />
                </div>

                {/* Content */}
                <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                    {children}
                </div>
            </div>
            </div>
    );
}