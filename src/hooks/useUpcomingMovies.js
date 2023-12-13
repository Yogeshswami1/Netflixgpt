import { useDispatch, useSelector } from "react-redux";
import {  addUpComingMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constant";
import { useEffect } from "react";
const useUpcomingMovies = () =>{
  const dispatch = useDispatch();
  const upComingMovies = useSelector(store=> store.movies.upComingMovies)

  
  const getUpComingMovies = async () => {
  const data = await fetch('https://api.themoviedb.org/3/movie/upcoming', API_OPTIONS)
  
  const json = await data.json();
  console.log(json);
  dispatch(addUpComingMovies(json.results))
  };
  useEffect(()=>{
     !upComingMovies && getUpComingMovies();
  },[])
}

export default useUpcomingMovies;