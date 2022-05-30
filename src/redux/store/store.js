import { configureStore } from '@reduxjs/toolkit'
import tableslice from '../slices/tableslice'

export const store = configureStore({
    reducer: {
        TableSlc: tableslice
    },
})