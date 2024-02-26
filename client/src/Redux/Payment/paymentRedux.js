import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const processPayment = createAsyncThunk("processPayment", async (paymentData) => {
    try {
        const response = await fetch('http://localhost:5000/api/payment/processPayment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount:paymentData.amount,
                currency:paymentData.currency,
                receipt:paymentData.receipt
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error.message || 'Adding  failed.';
    }
});

export const paymentValidation = createAsyncThunk("validatePayment", async ({ responseData, userId }) => {
    try {
        const response = await fetch('http://localhost:5000/api/payment/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...responseData, userId }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error.message || 'Adding failed.';
    }
});


const initialState = {
    loading: false,
    error: null,
    paymentData: [],
    validationData: [],
};

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(processPayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(processPayment.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.paymentData=action.payload;
            })
            .addCase(processPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(paymentValidation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(paymentValidation.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.validationData=action.payload;
            })
            .addCase(paymentValidation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export const paymentReducer = paymentSlice.reducer;
