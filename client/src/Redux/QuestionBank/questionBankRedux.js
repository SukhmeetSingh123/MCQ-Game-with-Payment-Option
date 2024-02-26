import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchQuestions = createAsyncThunk("questionBank/fetchQuestions", async (userId) => {
    try {
        const response = await fetch(`http://localhost:5000/api/questionBank/fetchQuestions/${userId}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();

        return data;
    } catch (error) {
        throw error;
    }
});
export const fetchAllQuestions = createAsyncThunk("questionBank/fetchAllQuestions", async () => {
    try {
        const response = await fetch("http://localhost:5000/api/questionBank/fetchAllQuestions");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();

        return data;
    } catch (error) {
        throw error;
    }
});

const initialState = {
    loading: false,
    error: null,
    questions: [],
    allQuestions:[]
};

const questionBankSlice = createSlice({
    name: "questionBank",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.loading = false;
                state.error=null;
                state.questions = action.payload;
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            
            .addCase(fetchAllQuestions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllQuestions.fulfilled, (state, action) => {
                state.loading = false;
                state.allQuestions = action.payload;
                state.error=null;
            })
            .addCase(fetchAllQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});
export const questionBankReducer = questionBankSlice.reducer;
