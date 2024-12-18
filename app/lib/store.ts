import { configureStore } from "@reduxjs/toolkit";
import InvoiceSlice from "./features/invoices/invoicesSlice";
import CustomersSlice from "./features/customers/customersSlice";

export const store = configureStore({
    reducer: {
        invoices: InvoiceSlice.reducer,
        customers: CustomersSlice.reducer
    },
});
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
