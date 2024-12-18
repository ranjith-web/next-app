'use client';

import clsx from 'clsx';
import { useTransition } from 'react';
import { Locale } from '@/i18n/config';
import { setUserLocale } from '@/app/services/locale';

type Props = {
    defaultValue: string;
    items: Array<{ value: string; label: string }>;
    label: string;
};

export default function LocaleSwitcherSelect({
    defaultValue,
    items,
    label
}: Props) {

    const [isPending, startTransition] = useTransition();

    function onChange(value: string) {
        const locale = value as Locale;
        startTransition(() => {
            setUserLocale(locale);
        });
    }

    return (
        <div className= "relative ml-4">
            <select
                aria-label={label}
                defaultValue={defaultValue}
                onChange={(e) => onChange(e.target.value)}
                className={clsx(
                    'block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500',
                    isPending && 'pointer-events-none opacity-60'
                )}
            >
                {items.map((item) => (
                    <option
                        key={item.value}
                        value={item.value}
                        className="flex cursor-default items-center px-3 py-2 text-base text-slate-900"
                    >
                        {item.label}
                    </option>
                ))}
            </select>
        </div>
    );
}