import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { authReducer } from "../../modules/auth/authorizationSlise";
import { appReducer } from "../../modules/app/appSlise";

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(thunkMiddleware),
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;
