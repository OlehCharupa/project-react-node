import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./slice";
import storage from "redux-persist/lib/storage";
import sprintsReducer from "./reducers/sprintsReducer.js";
import tasksReducer from "./reducers/tasksReducer.js";
import projectsReducer from "./reducers/projectsReducer";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["token"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    sprints: sprintsReducer,
    tasks: tasksReducer,
    auth: persistedReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  devTools: process.env.NODE_ENV !== "production",
});
export const persistor = persistStore(store);
