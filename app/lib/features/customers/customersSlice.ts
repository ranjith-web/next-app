import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    {
      id: '3',
      name: 'Charlie Brown',
      email: 'charlie.brown@example.com',
      image_url: 'https://randomuser.me/api/portraits/men/2.jpg',
      total_invoices: 3,
      total_pending: 150,
      total_paid: 450,
    },
    {
      id: '4',
      name: 'Diana Ross',
      email: 'diana.ross@example.com',
      image_url: 'https://randomuser.me/api/portraits/women/3.jpg',
      total_invoices: 3,
      total_pending: 150,
      total_paid: 450,
    },
    {
      id: '5',
      name: 'Eve Adams',
      email: 'eve.adams@example.com',
      image_url: 'https://randomuser.me/api/portraits/women/2.jpg',
      total_invoices: 3,
      total_pending: 150,
      total_paid: 450,
    },
    {
      id: '6',
      name: 'Emily Taylor',
      email: 'emily.taylor@example.com',
      image_url: 'https://randomuser.me/api/portraits/women/4.jpg',
      total_invoices: 3,
      total_pending: 150,
      total_paid: 450,
    },
    // Add more static customer data as needed
];
const CustomersSlice = createSlice({
    name: "customers",
    initialState: staticCustomers,
    reducers: {
        updateCustomerById: (state, action: PayloadAction<any>) => {
          const { customerId, status, amountInCents, isEdit } = action.payload;
          const customer = state.find(item => item.id === customerId);
          if (customer) {
            if(!isEdit) customer.total_invoices += 1;

            if (status === "pending") {
                customer.total_pending += amountInCents;
            } else if (status === "paid") {
                customer.total_paid += amountInCents;
            }
          }
        }
    },
});

export default CustomersSlice;
export const { updateCustomerById } = CustomersSlice.actions;