import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const API = process.env.REACT_APP_SERVER_URL;

// getting alluser
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const res = await fetch(API);
    const data = await res.json();
    if (!res.ok) {
        toast(data.message.length < 80 ? data.message : 'Some error occured while fetching users');
        throw new Error(data.message);
    };
    return data.users;
});

// adding new user
export const createUser = createAsyncThunk('users/createUser', async (userData) => {
    const res = await fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    const data = await res.json();
    if (!res.ok) {
        toast(data.message.length < 80 ? data.message : 'Some error occured while adding user');
        throw new Error(data.message);
    };
    toast(data.message);
    return data.user;
});

// getting a single user
export const fetchUser = createAsyncThunk('users/fetchUser', async (id) => {
    const res = await fetch(`${API}/${id}`);
    const data = await res.json();
    if (!res.ok) {
        toast(data.message.length < 80 ? data.message : 'Some error occured while fetching user');
        throw new Error(data.message);
    };
    return data.user;
});

// updating user
export const updateUser = createAsyncThunk('users/updateUser', async ({ id, userData }) => {
    const res = await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    const data = await res.json();
    if (!res.ok) {
        toast(data.message.length < 80 ? data.message : 'Some error occured while updating user');
        throw new Error(data.message);
    };
    toast(data.message);
    return data.user;
});

// deleting user
export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
    const res = await fetch(`${API}/${id}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    if (!res.ok) {
        toast(data.message.length < 80 ? data.message : 'Some error occured while deleting user');
        throw new Error(data.message);
    };
    toast(data.message);
    return id;
});

// Defining initial state
const initialState = {
    isLoading: false,
    isError: null,
    users: [],
    user: null,
};

// Creating slicer
const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.isLoading = true;
            state.isError = null;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = action.error.message;
        });

        builder.addCase(createUser.pending, (state) => {
            state.isLoading = true;
            state.isError = null;
        });
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = [...state.users, action.payload];
        });
        builder.addCase(createUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = action.error.message;
        });

        builder.addCase(fetchUser.pending, (state) => {
            state.isLoading = true;
            state.isError = null;
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = action.error.message;
        });

        builder.addCase(updateUser.pending, (state) => {
            state.isLoading = true;
            state.isError = null;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.users = state.users.map((user) => {
                if (user._id === action.payload._id) {
                    return action.payload
                };
                return user;
            });
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = action.error.message;
        });

        builder.addCase(deleteUser.pending, (state) => {
            state.isLoading = true;
            state.isError = null;
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = state.users.filter(user => user._id !== action.payload);
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = action.error.message;
        });
    }
});

export default usersSlice.reducer;