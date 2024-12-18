import { UserCircleIcon } from '@heroicons/react/24/outline';

export default function AcmeLogo({ name }) {
  return (
    <div
      className={`flex flex-row items-center leading-none text-white`}
    >
      <UserCircleIcon className="h-12 w-12" />
      <p className="text-[44px]">{name || ''}</p>
    </div>
  );
}
