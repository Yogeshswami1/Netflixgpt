import React, { useEffect } from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from "./MainContainer";
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRated from '../hooks/useTopRated';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import { useSelector } from 'react-redux';
import GptSearch from './GptSearch';
// import SecondaryContainer from './SecondaryContainer'

const Browse = () => {
  const showGptSearch = useSelector((store)=>store.gpt.showGptSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRated();
  useUpcomingMovies();
  
  return (
    <div>
      <Header/> 
      {showGptSearch ? (<GptSearch/> ):
       (<><MainContainer/>
      <SecondaryContainer/></>
      
      )}
      
      
    
    </div>
  )
}

export default Browse