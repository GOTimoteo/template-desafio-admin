import { createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../actions/userAction";
import { RootState } from "store";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [] as User[],
    status: "idle" as requestStatus,
    error: undefined as requestError,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const makeSelectCardEnabledUsers = () => {
  const selectUsers = (state: RootState) => state.users.users;
  const selectFeatures = (state: RootState) => state.features.features;
  const selectCardFeatures = createSelector(
    [selectFeatures],
    (features) => features.find(({ name }) => name === "card")?.id // TODO: centralizar variáveis hardcoded em dictionaries para facilitar entendimento e alteração das regras de negócio
  );

  return createSelector([selectUsers, selectCardFeatures], (users, features) =>
    users.filter(({ enabledFeatures }) =>
      features !== undefined ? enabledFeatures.includes(features) : false
    )
  );
};

// TECH: essa factory function memoiza os parâmetros e torna operações pesadas mais leves.
// Os selectors devem ser aninhados dessa forma para memoizar valores aninhados corretamente.

export default userSlice;
