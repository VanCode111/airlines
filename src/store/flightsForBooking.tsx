import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

type AuthState = {
  user: any;
};

const slice = createSlice({
  name: "flightsForBooking",
  initialState: { flights: [] },
  reducers: {
    setFlights: (state, { payload }: PayloadAction<any>) => {
      state.flights = payload;
    },
  },
});

export default slice.reducer;
