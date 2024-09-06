const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
    name: 'mock',
    initialState: 
    {
        response: []
    },
    reducers:
    {
        updateResponse(state, action)
        {
            const { index, rating, feedback } = action.payload;
            state.response[index] = {rating, feedback};
        },

        addResponse(state, action)
        {
            state.response.push(action.payload)
        }
    }
})

export const {addResponse, updateResponse} = slice.actions
export default slice.reducer