import '@/app/ui/global.css';
// import { NextAuthProvider } from './ui/next-auth';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <NextAuthProvider> */}
          {children}
        {/* </NextAuthProvider> */}
      </body>
    </html>
  );
}
