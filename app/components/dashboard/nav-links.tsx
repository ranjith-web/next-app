'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  ChatBubbleBottomCenterIcon,
  FilmIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {useTranslations} from 'next-intl';

export default function NavLinks({ role = "" }) {
  const translateMessage = useTranslations('Common');
  const pathname = usePathname();
  // Map of links to display in the side navigation.
  // Depending on the size of the application, this would be stored in a database.
  const baseLinks = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon, label: translateMessage('home') },
    { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon, label: translateMessage('customers') },
    { name: 'Posts', href: '/dashboard/posts', icon: ChatBubbleBottomCenterIcon, label: translateMessage('posts') },
    { name: 'Apply Leave', href: '/applyleave', icon: FilmIcon, label: 'Apply Leave' },
  ];

  const adminLink = {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
    label: translateMessage('invoices')
  };

  const links =
    role === 'admin'
      ? [
          ...baseLinks.slice(0, 1), // Take 'Home'
          adminLink,                // Insert 'Invoices'
          ...baseLinks.slice(1),    // Take 'Customers'
        ]
      : baseLinks;
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.label}</p>
          </Link>
        );
      })}
    </>
  );
}