import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
import axios from "axios";

// ** Fetch Users
export const fetchData = createAsyncThunk(
  "appUsers/fetchData",
  async () => {
    // ** token from local storage
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/users/`,
      {
        headers: { Authorization: `JWT ${storedToken}` },
      }
    );

    return response.data;
  }
);


export const appUsersSlice = createSlice({
  name: "appUsers",
  initialState: {
    data: null,
    detailData: [],
  },
  reducers: {
    addUsers:( state , action)=> {
      state.data =  action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});


export const { addUsers } = appUsersSlice.actions


export default appUsersSlice.reducer;
