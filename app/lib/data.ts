import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';

const staticInvoices = [
  { id: 1, amount: 100, date: '2024-12-01', status: 'Paid', name: 'John Doe', email: 'john@example.com', image_url: 'https://via.placeholder.com/150' },
  { id: 2, amount: 200, date: '2024-12-02', status: 'Unpaid', name: 'Jane Doe', email: 'jane@example.com', image_url: 'https://via.placeholder.com/150' },
  { id: 3, amount: 150, date: '2024-12-03', status: 'Pending', name: 'Alice Smith', email: 'alice@example.com', image_url: 'https://via.placeholder.com/150' },
  { id: 4, amount: 300, date: '2024-12-04', status: 'Paid', name: 'Bob Brown', email: 'bob@example.com', image_url: 'https://via.placeholder.com/150' },
  { id: 5, amount: 250, date: '2024-12-05', status: 'Unpaid', name: 'Charlie White', email: 'charlie@example.com', image_url: 'https://via.placeholder.com/150' },
  { id: 6, amount: 350, date: '2024-12-06', status: 'Paid', name: 'David Green', email: 'david@example.com', image_url: 'https://via.placeholder.com/150' },
  { id: 7, amount: 120, date: '2024-12-07', status: 'Unpaid', name: 'Emily Taylor', email: 'emily@example.com', image_url: 'https://via.placeholder.com/150' },
  { id: 8, amount: 180, date: '2024-12-08', status: 'Paid', name: 'Frank Black', email: 'frank@example.com', image_url: 'https://via.placeholder.com/150' },
  { id: 9, amount: 220, date: '2024-12-09', status: 'Pending', name: 'Grace Lee', email: 'grace@example.com', image_url: 'https://via.placeholder.com/150' },
  { id: 10, amount: 140, date: '2024-12-10', status: 'Paid', name: 'Henry White', email: 'henry@example.com', image_url: 'https://via.placeholder.com/150' },
  // Add more invoices as needed
];

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export function fetchFilteredInvoicesStatic(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // Filter the invoices based on the query
  const filteredInvoices = staticInvoices.filter(invoice =>
    invoice.name.toLowerCase().includes(query.toLowerCase()) ||
    invoice.email.toLowerCase().includes(query.toLowerCase()) ||
    invoice.amount.toString().includes(query) ||
    invoice.date.includes(query) ||
    invoice.status.toLowerCase().includes(query)
  );

  // Paginate the filtered invoices
  const paginatedInvoices = filteredInvoices.slice(offset, offset + ITEMS_PER_PAGE);

  // Return the filtered and paginated invoices wrapped in a Promise
  return Promise.resolve(paginatedInvoices);
}


export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export function fetchInvoicesPagesStatic(query: string) {
  const filteredInvoices = staticInvoices.filter(invoice =>
    invoice.name.toLowerCase().includes(query.toLowerCase()) ||
    invoice.email.toLowerCase().includes(query.toLowerCase()) ||
    invoice.amount.toString().includes(query) ||
    invoice.date.includes(query) ||
    invoice.status.toLowerCase().includes(query)
  );

  // Calculate total pages (based on filtered results)
  const totalPages = Math.ceil(filteredInvoices.length / ITEMS_PER_PAGE);

  return Promise.resolve(totalPages);  // Return a Promise, as in the original async function
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export function fetchInvoiceByIdStatic(id: string) {
  // Find the invoice with the matching ID
  const invoice = staticInvoices.find(invoice => invoice.id === id);

  if (!invoice) {
    // Simulate an error if the invoice is not found
    throw new Error(`Invoice with ID ${id} not found.`);
  }

  // Convert amount from cents to dollars
  const formattedInvoice = {
    ...invoice,
    amount: invoice.amount / 100,
  };

  // Simulate asynchronous operation
  return Promise.resolve(formattedInvoice);
}


export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export function fetchCustomersStatic() {
  // Static data simulating the customer records
  const staticCustomers = [
    { id: "1", name: 'Alice Smith' },
    { id: "2", name: 'Bob Johnson' },
    { id: "3", name: 'Charlie Brown' },
    { id: "4", name: 'Diana Ross' },
    { id: "5", name: 'Eve Adams' },
  ];

  // Simulate an asynchronous operation by returning a Promise
  return Promise.resolve(staticCustomers);
}


export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}


export function fetchFilteredCustomersStatic(query: string) {
  // Static data to simulate customer records
  const staticCustomers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      image_url: 'https://randomuser.me/api/portraits/men/1.jpg',
      total_invoices: 5,
      total_pending: 200,
      total_paid: 800,
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      image_url: 'https://randomuser.me/api/portraits/women/1.jpg',
      total_invoices: 3,
      total_pending: 150,
      total_paid: 450,
    },
    // Add more static customer data as needed
  ];

  // Filter the static data based on the query
  const filteredCustomers = staticCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(query.toLowerCase()) ||
    customer.email.toLowerCase().includes(query.toLowerCase())
  );

  // Format the data before returning
  const formattedCustomers = filteredCustomers.map((customer) => ({
    ...customer,
    total_pending: formatCurrency(customer.total_pending),
    total_paid: formatCurrency(customer.total_paid),
  }));

  return formattedCustomers;
}