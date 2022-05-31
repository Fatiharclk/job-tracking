import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Data: [],
}

export const tableSlice = createSlice({
    name: 'TableSlice',
    initialState,
    reducers: {
        AddItem: (state, action) => {
            state.Data.push(action.payload)
        },
        DeleteItem: (state, action) => {
            state.Data.splice(state.Data.findIndex(e => e.name === action.payload), 1);
        },
        EditItem: (state, action) => {
            var index = state.Data.map(e => e.name).indexOf(action.payload.name)
            state.Data[index].priority = action.payload.priority
        },
    },
})

// Action creators are generated for each case reducer function
export const { AddItem, DeleteItem, EditItem } = tableSlice.actions

export default tableSlice.reducer