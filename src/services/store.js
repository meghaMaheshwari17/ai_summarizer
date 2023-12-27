import { configureStore } from "@reduxjs/toolkit";
import { articleApi } from "./article";
import { audioApi } from "./audio";
// a store is a global state
export const store=configureStore({
    reducer:{
        [articleApi.reducerPath]:articleApi.reducer,
        [audioApi.reducerPath]:audioApi.reducer
    },
    // middleware allows to do something with the state before we geti it
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(articleApi.middleware).concat(audioApi.middleware)
});