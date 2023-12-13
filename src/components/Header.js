import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../utils/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from '../utils/constant';
import { toggleGptSearchView } from '../utils/gptSlice';
import lang from '../utils/languageConstant';
import { changeLanguage } from '../utils/configSlice';
const Header = () => {
  const dispatch  = useDispatch(); 
  const navigate = useNavigate();
  const showGptSearch = useSelector((store)=> store.gpt.showGptSearch)


  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/")
      // Sign-out successful.
    }).catch((error) => {
      navigate("/error")
      // An error happened.
    });
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const { uid,email,displayName} = user;
          dispatch(addUser({uid: uid,email: email,displayName: displayName}));
          navigate("/browse")
          
          // ...
        } else {
            dispatch(removeUser());
            navigate("/")
         
          // User is signed out
          // ...
        }
      });

      return () => unsubscribe();
},[]);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView()) 
    
  }
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between
    '>

<img className='w-44 mx-auto md:mx-0' src={LOGO} alt='logo'></img>

<div className='flex p-2 justify-between'> 


{showGptSearch && (
<select className='p-2 m-2 bg-gray-700 text-white rounded-lg' onChange={handleLanguageChange}>
  {
    SUPPORTED_LANGUAGES.map((lang)=>(
      <option key={lang.indentifier} value={lang.indentifier}>
        {lang.name}
      </option>
    ))
  }
</select>
)}
  <button className='py-2 px-4 mx-3 mt-2  bg-purple-800 text-white rounded-lg' onClick={handleGptSearchClick}>{showGptSearch ? "HomePage" : "Gpt Search"}</button>                 
  <img className='hidden md:block  w-12 h-12  mt-2' src={USER_AVATAR}/>
  <button className='text-white hover:text-red-700 bg-gray-700 p-2 rounded m-2' onClick={handleSignOut}>(SignOut)</button>

</div>
    </div>
    
    
   
  ) 
}

export default Header