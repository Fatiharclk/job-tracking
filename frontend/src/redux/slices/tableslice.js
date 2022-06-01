import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import GetJobData from '../../services/ApiServices'
const initialState = {
    Data: [],
}


export const getJobData = createAsyncThunk(
    'Job/getJobData',
    async () => {
        const response = await GetJobData()
        console.log(response.data)
        return response.data
    }
)

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
    extraReducers: (builder) => {
        builder.addCase(getJobData.fulfilled, (state, action) => {
            state.Data = action.payload
        })
    },
})

// Action creators are generated for each case reducer function
export const { AddItem, DeleteItem, EditItem } = tableSlice.actions

export default tableSlice.reducer