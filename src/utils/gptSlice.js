import { createSlice } from "@reduxjs/toolkit";

const  gptSlice = createSlice({
    name: "gpt",
    initialState:{
        showGptSearch: false,
        // showGPTSearch: false,
        gptMovies:null,
        movieResults:null,
        movieNames:null,
        loading:false,
    },
    reducers: {
        toggleGptSearchView: (state,action) => {
            state.showGptSearch = !state.showGptSearch;
        },
        addGPTMovieResult:(state,{payload})=>{
            const{movieNames,movieResults}=payload
        state.movieNames = movieNames;
        state.movieResults=movieResults;
        },
        setLoading:(state,{payload})=>{
            state.loading=payload;
        }
    },
});
export const {toggleGptSearchView,setLoading,addGPTMovieResult} = gptSlice.actions;

export default gptSlice.reducer;
