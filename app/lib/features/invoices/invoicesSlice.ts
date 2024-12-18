import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const staticInvoices = [
    { id: "uuid-1", customerId: "1", amount: 100, date: '2024-12-01', status: 'Paid', name: 'John Doe', email: 'john@example.com', image_url: 'https://via.placeholder.com/150' },
    { id: "uuid-2", customerId: "2", amount: 200, date: '2024-12-02', status: 'Unpaid', name: 'Jane Smith', email: 'jane@example.com', image_url: 'https://via.placeholder.com/150' },
    { id: "uuid-3", customerId: "3", amount: 300, date: '2024-12-04', status: 'Paid', name: 'Charlie Brown', email: 'charlie.bob@example.com', image_url: 'https://via.placeholder.com/150' },
    { id: "uuid-4", customerId: "4", amount: 250, date: '2024-12-05', status: 'Unpaid', name: 'Diana Ross', email: 'diana.ross@example.com', image_url: 'https://via.placeholder.com/150' },
    { id: "uuid-5", customerId: "5", amount: 350, date: '2024-12-06', status: 'Paid', name: 'Eve Adams', email: 'eve.adams@example.com', image_url: 'https://via.placeholder.com/150' },
    { id: "uuid-6", customerId: "6", amount: 120, date: '2024-12-07', status: 'Unpaid', name: 'Emily Taylor', email: 'emily@example.com', image_url: 'https://via.placeholder.com/150' },
];
const InvoiceSlice = createSlice({
    name: "invoices",
    initialState: staticInvoices,
    reducers: {
        addInvoice: (state, action: PayloadAction<any>) => {
            const { customerId, status, amountInCents, date, image_url, name, email } = action.payload;
            const uuid = v4();
            const newInvoice = {
                id: uuid,
                amount: amountInCents,
                status,
                date,
                image_url,
                name,
                email,
                customerId
            }
            state.unshift(newInvoice);
        },
        editInvoice: (state, action: PayloadAction<any>) => {
            const { id, amountInCents, customerId, name, email, image_url, status } = action.payload;
            const invoice = state.find(item => item.id === id);
            if (invoice) {
                Object.assign(invoice, {
                    amount: amountInCents,
                    customerId,
                    name,
                    email,
                    image_url,
                    status
                });
            }
        },
        deleteInvoice: (state, action: PayloadAction<any>) => {
            debugger;
            const { id } = action.payload;
            const idx = state.findIndex(item => item.id === id);
            if (idx !== -1) {
                state.splice(idx, 1); // Removes the item at the specified index
            }
        }
    },
});

export default InvoiceSlice;
export const { addInvoice, editInvoice, deleteInvoice } = InvoiceSlice.actions;