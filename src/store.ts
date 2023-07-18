import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "slices/userSlice";
import cardSlice from "slices/cardSlice";
import auditSlice from "slices/auditSlice";
import analystSlice from "slices/analystSlice";
import featureSlice from "slices/featureSlice";

export const store = configureStore({
  reducer: combineReducers({
    users: userSlice.reducer,
    cards: cardSlice.reducer,
    audits: auditSlice.reducer,
    analysts: analystSlice.reducer,
    features: featureSlice.reducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
