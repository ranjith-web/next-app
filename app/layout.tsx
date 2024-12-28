import '@/app/components/global.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import StoreProvider from './storeProvider';
import SideNav from './components/dashboard/sidenav';
import { auth } from '@/auth';
import LocaleSwitcher from './components/localeSwitcher';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const authResult = await auth() as any || {};
  const user = authResult?.user;

  return (
    <html lang={locale}>
      <body>
        <StoreProvider>
          <NextIntlClientProvider messages={messages}>
            <MainLayout user={user} children={children} />
          </NextIntlClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

// Main Layout component
function MainLayout({ user, children }: { user: any; children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      {user && 
        <div className="w-full flex-none md:w-64">
          <SideNav userauth={user} />
        </div>
      }
      <div className="flex-grow flex flex-col">
        {user && 
          <div className="flex items-center justify-end p-6 md:p-3">
            <span>{user?.name}</span>
            <LocaleSwitcher />
          </div>
        }
        {children}
      </div>
    </div>
  );
}
