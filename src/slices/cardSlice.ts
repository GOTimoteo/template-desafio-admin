import { createSlice } from "@reduxjs/toolkit";
import {
  changeCardStatus,
  fetchCards,
  removeCard,
} from "../actions/cardAction";

const cardSlice = createSlice({
  name: "cards",
  initialState: {
    cards: [] as Card[],
    status: "idle" as requestStatus,
    error: undefined as requestError,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cards = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(changeCardStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changeCardStatus.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        const newState = state.cards.map((card) =>
          card.id === payload.card.id ? payload.card : card
        );
        state.cards = newState;
      })
      .addCase(changeCardStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removeCard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeCard.fulfilled, (state, { meta }) => {
        state.status = "succeeded";
        state.cards.splice(
          state.cards.findIndex(({ id }) => id === meta.arg.id),
          1
        );
        console.log(state.cards, "CARDS", meta.arg);
      })
      .addCase(removeCard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default cardSlice;
