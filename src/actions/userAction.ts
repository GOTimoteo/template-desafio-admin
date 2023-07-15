import { createAsyncThunk } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import { getUsers } from "../services/users";

export const userActions = userSlice.actions;

export const fetchUsers = createAsyncThunk("users/fetchAllUsers", async () => {
  const response = await getUsers();
  return response;
});
