import { configureStore } from "@reduxjs/toolkit";
import mockReducer from "./slices/mockReducer";

export const store = configureStore({
    reducer:
    {
        mockResponse: mockReducer
    }
})