import { createSlice } from "@reduxjs/toolkit";
import { fetchImageUrl } from "./Action";


const initialState = {
    loading :false,
    error:{},
    imageUrl: null
}

const fetchImageUrlSlice = createSlice({
    name: 'fetchImage',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchImageUrl.pending ,(state)=> {
            state.loading = true;
        })
        .addCase(fetchImageUrl.fulfilled ,(state, action)=> {
            state.loading = false;
            state.imageUrl = action.payload.data
        })
        .addCase(fetchImageUrl.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default fetchImageUrlSlice.reducer
