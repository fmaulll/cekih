import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "players",
  initialState: {
    players: [],
    isShow: true,
    isShowNewGameModal: false,
  },
  reducers: {
    showNewGameModal(state) {
      state.isShowNewGameModal = true;
    },
    closeNewGameModal(state) {
      state.isShowNewGameModal = false;
    },
    showNewGame(state) {
      state.isShow = true;
    },
    closeNewGame(state) {
      state.isShow = false;
    },
    replacePlayers(state, action) {
      state.players = action.payload;
    },
    addPlayers(state, action) {
      const newPlayers = action.payload;
      state.players = newPlayers;
    },
    addPoint(state, action) {
      const selectedPlayer = action.payload;
      const playerIndex = state.players.findIndex(
        (player) => player.id === selectedPlayer.id
      );
      state.players[playerIndex].point += parseInt(selectedPlayer.point);
    },
    minusPoint(state, action) {
      const selectedPlayer = action.payload;
      const playerIndex = state.players.findIndex(
        (player) => player.id === selectedPlayer.id
      );
      state.players[playerIndex].point -= parseInt(selectedPlayer.point);
    },
  },
});
export const playerActions = playerSlice.actions;

export default playerSlice;
