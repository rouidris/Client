import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
    requests: [],
    loading: false,
};

// Создание заявки
export const createRequest = createAsyncThunk(
    'request/createRequest',
    async (postId, request) => {
        try {
            const { data } = await axios.post(`/request/${postId}`,
                postId,
                request,
            );
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getPostRequest = createAsyncThunk(
    'request/getPostRequest',
    async (postId) => {
        try {
            const { data } = await axios.get(`/posts/requests/${postId}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

// Создание среза для заявок
export const requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {},
    extraReducers: {
        [createRequest.pending]: (state) => {
            state.loading = true;
        },
        [createRequest.fulfilled]: (state, action) => {
            state.loading = false;
            state.requests.push(action.payload);
        },
        [createRequest.rejected]: (state) => {
            state.loading = false;
        },

        [getPostRequest.pending]: (state) => {
            state.loading = true;
        },
        [getPostRequest.fulfilled]: (state, action) => {
            state.loading = false;
            state.requests = action.payload;
        },
        [getPostRequest.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export default requestSlice.reducer;
