import { configureStore } from "@reduxjs/toolkit";
import recordReducer from "./recordReducer";
import testingReducer from "./testingReducer";

export default configureStore({
  reducer: {
    recordReducer,
    testingReducer,
  }
});