import { configureStore } from "@reduxjs/toolkit";

import reducer from "./reducer"

// key value 同名简写
const store = configureStore({
    // reducer: reducer
    reducer
})

export default store