import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../utils/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from '../utils/constant';
import { toggleGptSearchView } from '../utils/gptSlice';
import lang from '../utils/languageConstant';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showButtons, setShowButtons] = useState(false);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between items-end'>
      <img className='w-44 mx-auto md:mx-0' src={LOGO} alt='logo' />

      <div className='flex p-2 justify-between items-center'>
        {!isMobile && (
          <>
            {showGptSearch && (
              <select className='p-2 m-2 bg-gray-700 text-white rounded-lg' onChange={handleLanguageChange}>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.indentifier} value={lang.indentifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}
            <button className='py-2 px-4 mx-3 mt-2 bg-purple-800 text-white rounded-lg' onClick={handleGptSearchClick}>
              {showGptSearch ? "HomePage" : "Gpt Search"}
            </button>
            <img className='w-12 h-12 mt-2' src={USER_AVATAR} alt='user-avatar' />
            <button className='text-white hover:text-red-700 bg-gray-700 p-2 rounded m-2' onClick={handleSignOut}>
              (SignOut)
            </button>
          </>
        )}
        
        {isMobile && (
          <div className='ml-auto'>
            <button className='text-white hover:text-red-700 bg-gray-700 p-2 rounded m-2' onClick={toggleButtons}>
              ...
            </button>
            {showButtons && (
              <>
                {showGptSearch && (
                  <select className='p-2 m-2 bg-gray-700 text-white rounded-lg' onChange={handleLanguageChange}>
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <option key={lang.indentifier} value={lang.indentifier}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                )}
                <button className='py-2 px-4 mx-3 mt-2 bg-purple-800 text-white rounded-lg' onClick={handleGptSearchClick}>
                  {showGptSearch ? "HomePage" : "Gpt Search"}
                </button>
                <img className='w-12 h-12 mt-2' src={USER_AVATAR} alt='user-avatar' />
                <button className='text-white hover:text-red-700 bg-gray-700 p-2 rounded m-2' onClick={handleSignOut}>
                  (SignOut)
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;