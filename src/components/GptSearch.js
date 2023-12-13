import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'
import { BG_URL } from '../utils/constant'

const GptSearch = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen -z-10">
  <img className="w-full h-full object-cover" src={BG_URL} alt="logo" />
</div>
<div className="relative">
  <GptSearchBar />
  <GptMovieSuggestion />
</div>

    </>
  )
}

export default GptSearch 