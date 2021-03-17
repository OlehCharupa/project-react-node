import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import sprintsReducer from "./reducers/sprintsReducer.js";
import projectsReducer from "./reducers/projectsReducer.js";
import tasksReducer from "./reducers/tasksReducer.js";
import authReducer, { authPersistConfig } from "./reducers/authReducer";
import combineReducers from './reducers/authReducer';
import modalReducer from "./reducers/modalReducer.js";
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

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    sprints: sprintsReducer,
    tasks: tasksReducer,
    auth: persistReducer(authPersistConfig, authReducer),
    modal: modalReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  devTools: process.env.NODE_ENV !== "production",
});
export const persistor = persistStore(store);
