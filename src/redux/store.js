import { configureStore } from "@reduxjs/toolkit";

import reducer from "./reducer"

// key value ååįŽå
const store = configureStore({
    // reducer: reducer
    reducer
})

export default store