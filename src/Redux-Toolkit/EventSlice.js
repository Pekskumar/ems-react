import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  EventData: localStorage.getItem("EventStore")
    ? JSON.parse(localStorage.getItem("EventStore"))
    : null,
  CreateEventFlag: true,
};

const EventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    EventStoreSlice: (state, actions) => {
      state.EventData = actions.payload;
      localStorage.setItem("EventStore", JSON.stringify(actions.payload));
    },
    CreateEventFlagSlice: (state, actions) => {
      state.CreateEventFlag = actions.payload;
    },
  },
});

export const { EventStoreSlice, CreateEventFlagSlice } = EventSlice.actions;
export default EventSlice.reducer;
