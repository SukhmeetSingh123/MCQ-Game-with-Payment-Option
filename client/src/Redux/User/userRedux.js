import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchUser = createAsyncThunk("fetchUser", async () => {
    try {
        const response = await fetch('http://localhost:5000/api/user/fetchUserDetail');
        const data = await response.json();

        return data;
    } catch (error) {
        throw error.message || 'Fetching failed.';
    }
});

export const addUser = createAsyncThunk("addUser", async (userId) => {
    try {
        const response = await fetch('http://localhost:5000/api/user/addUserDetail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId}),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error.message || 'Adding  failed.';
    }
});

export const updateUser = createAsyncThunk("updateUser", async ({ userId ,quizAnswer,paymentStatus}) => {
    try {
        const response = await fetch(`http://localhost:5000/api/user/updateUserDetail/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quizAnswer,paymentStatus}),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error.message || 'Updating failed.';
    }
});


const initialState = {
    loading: false,
    error: null,
    userData: [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload;
                state.error = null;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                if(action.payload.message){
                    return;
                }
                state.userData = action.payload;
            })
            
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error=null;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export const userReducer = userSlice.reducer;
