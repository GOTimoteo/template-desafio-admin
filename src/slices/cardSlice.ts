import { createSlice } from "@reduxjs/toolkit";
import {
  changeCardStatus,
  createCard,
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
      .addCase(createCard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCard.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.cards.push(payload.card);
      })
      .addCase(createCard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
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
        const newState = state.cards?.map((card) =>
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
      })
      .addCase(removeCard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// TECH: A abordagem com createAsyncThunk facilita com que a aplicação escale, pois temos controle direto do ciclo de vida das Promises.
// Ao poder adicionar status em diversas entidades na store e em diferentes níveis dos objetos, podemos manter alta responsividade na UI.
// Se precisarmos de utilizar as entidades em widgets, por exemplo, garantimos que a demora ou a falha de alguma não interrompa o uso das demais.

export default cardSlice;
