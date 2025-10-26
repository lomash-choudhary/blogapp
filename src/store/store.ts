import { configureStore } from "@reduxjs/toolkit";

export const customStore = configureStore({
    reducer:{}
})

// this will export the current state of the store and it will keep on updating automatically as our store state changes.
export type RootState = ReturnType<typeof customStore.getState>