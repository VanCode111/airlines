import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

type AuthState = {
  user: any;
};

const slice = createSlice({
  name: "auth",
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials: (state, { payload }: PayloadAction<any>) => {
      state.user = payload;
    },
    removeCredentials: (state, { payload }: PayloadAction<any>) => {
      state.user = null;
    },
  },
});

export const { setCredentials, removeCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
