import { configureStore } from "@reduxjs/toolkit";
import EventSlice from "./EventSlice";

const Store = configureStore({
  reducer: {
    EventStore: EventSlice,
  },
});
export default Store;
