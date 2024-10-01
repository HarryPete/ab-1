const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
    name: 'mock',
    initialState: 
    {
        result: []
    },
    reducers:
    {
        updateResponse(state, action)
        {
            const { index, rating, feedback } = action.payload;
            state.result[index] = {rating, feedback};
        },

        addResponse(state, action)
        {
            state.result.push(action.payload)
        },

        resetResponse(state, action)
        {
            state.result = [];
        }
    }
})

export const {addResponse, updateResponse, resetResponse} = slice.actions
export default slice.reducer