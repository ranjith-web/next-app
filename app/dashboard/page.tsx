import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';

export default async function Page() {
    const totalPaidInvoices = 10;
    const totalPendingInvoices = 100;
    const numberOfInvoices = 20;
    const numberOfCustomers = 200;

    const revenue = [
        { month: "Jun", revenue: 200 },
        { month: "Jul", revenue: 1000 },
    ]

    const latestInvoices = [
        {id: "12345ftgyhuki890766", image_url: "https://randomuser.me/api/portraits/men/32.jpg", name: "Ranjith", email: "ranjith@gmail.com", amount: "100"}
    ]
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
