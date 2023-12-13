// import openai from "../hooks/openai";
import openai from '../utils/openai';
import React, { useRef } from 'react';
import { useState } from "react";
import { setLoading } from "../utils/gptSlice";
import { addGPTMovieResult } from "../utils/gptSlice";
import lang from '../utils/languageConstant'
// import { useSelector } from 'react-redux'
// import { API_OPTIONS } from '../utils/constant';

import { API_OPTIONS } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "lucide-react";



// import openai from "../utils/openai"
// const GptSearchBar =  () => {

//     const langKey = useSelector((store)=> store.config.lang)
//     const searchText = useRef(null);  
//     const handleGptSearchClick = async () => {
//         console.log(searchText.current.value);
      
//         const getQuery = "Act as a  Movie Recommendation system and suggest some movies for the query :" +searchText.current.value + ". onlt give me  names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar , Sholey , Golmaal, DON , Holiday "
    

//     const gptResults = await openai.chat.completions.create({
//         model: 'gpt-3.5-turbo', 
//         messages: [{ role: 'user', content: getQuery }],
//         stream: true,
//       });
//       console.log(gptResults.choices);
//     }
//   return (
//     <div  className='pt-[10%] flex justify-center'>
//         <form className='w-1/2 bg-black grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
//             <input ref={searchText} type='text' className='p-4 m-4 col-span-9' placeholder={lang[langKey].gptSearchPlaceholder}/>
//             <button className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg'onClick={handleGptSearchClick} >{lang[langKey].search}</button>
//         </form>
//     </div> 
//   ) 
// }

// export default GptSearchBar

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector((store) => store?.config?.lang);
  const searchText = useRef("");
  const [GPTMovies, setGPTMovies] = useState(null);

  const searchMovies = async (movie) => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          movie +
          "&include_adult=false&language=en-US&page=1",
        API_OPTIONS
      );
      const json = await data.json();
        
      return json.results ;
      
    } catch (error) {
      console.log(error);
    }
    
  };

  async function search(searchInput) {
    try {
      dispatch(setLoading(true))
      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: searchInput }],
        model: "gpt-3.5-turbo",
      });

      console.log(gptResults.choices);
      if (!gptResults.choices) {
        // Error Handling
      }
      console.log(gptResults?.choices?.[0]?.message?.content);

      // Update the state after receiving the data
      setGPTMovies(gptResults?.choices?.[0]?.message?.content.split(","));

      const moviesArray = gptResults?.choices?.[0]?.message?.content.split(",");

      const promiseArray = await moviesArray.map((movie) =>
        searchMovies(movie)
      );
      const results = await Promise.all(promiseArray);
      console.log(results);
      dispatch(
        addGPTMovieResult({ movieNames: moviesArray, movieResults: results })
      );

       dispatch(setLoading(false))
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearch = () => {
    
    const inputValue = searchText?.current?.value?.trim();
    if (inputValue) {
      // Create the search query based on user input
      const searchQuery =
        "Act as a Movie Recommendation system and suggest some movies for the query : " +
        inputValue +
        ". only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

      // Call the search function with the query
      search(searchQuery);
    }

    
  };

 

  return (
    <>
    {/* <div  className='pt-[10%] flex justify-center'>
//         <form className='w-1/2 bg-black grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
//             <input ref={searchText} type='text' className='p-4 m-4 col-span-9' placeholder={lang[langKey].gptSearchPlaceholder}/>
//             <button className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg'onClick={handleGptSearchClick} >{lang[langKey].search}</button>
//         </form>
//  </div>  */}







      <div className='pt-[35%] md:pt-[10%] flex justify-center'>
        <form className='w-full md:w-1/2 bg-black grid grid-cols-12 mt-5' onSubmit={(e) => e.preventDefault()}>
        <input
        ref={searchText}
        className='p-4 m-4 col-span-9' placeholder={lang[selectedLanguage].gptSearchPlaceholder}
        type='text'
        
      />
       <button
        onClick={handleSearch}
        className=' col-span-3 m-1 py-2 px-4 bg-red-700 text-white rounded-lg' > {lang[selectedLanguage].gptSearchPlaceholder}
       
      </button>
      

        </form>
    

     
      </div>
    </>
  );
};

export default GptSearchBar;