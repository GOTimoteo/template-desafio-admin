import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "../services/users";

export const fetchUsers = createAsyncThunk("users/fetchAllUsers", async () => {
  const response = await getUsers();
  return response;
});
