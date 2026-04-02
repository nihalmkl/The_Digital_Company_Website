"use client";

import { Provider } from "react-redux";
import React from "react";
 import { persistStore } from "redux-persist";
import { store } from "@/redux/store";

persistStore(store);

export const ReduxProvider = ( {children}: {children: React.ReactNode} ) => {
  return <Provider store={store}>{children}</Provider>;
};