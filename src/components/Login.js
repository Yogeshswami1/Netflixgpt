import { useRef, useState } from "react";
import Header from "./Header";
import {checkValidateData} from '../utils/validate';
import {  createUserWithEmailAndPassword ,signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from '../utils/firebase'
// import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { BG_URL } from "../utils/constant";

const Login = () => {

    const [isSignInForm,setIsSignForm] = useState(true)
    const [errorMessage,setErrorMessage] = useState(null);
    // const navigate = useNavigate()
    const dispatch = useDispatch();

    const name = useRef(null);

    const email = useRef(null);
    const password = useRef(null)

    const handleButtonClick = () => {
        // checkValidateData(email,password);
        console.log(email.current.value)
        console.log(password.current.value);
        const message = checkValidateData(email.current.value,password.current.value);
        setErrorMessage(message);
        if(message) return;
        if(!isSignInForm)
        {
            createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(auth.currentUser, {
        displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(() => {
        
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const { uid,email,displayName} = auth.currentUser;
            dispatch(addUser({uid: uid,email: email,displayName: displayName}))
            
            // ...
          
        // navigate("/browse")
        // Profile updated!
        // ...  
      }).catch((error) => {
        // An error occurred
        // ...
      });
      
    console.log(user)
   

    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+ "" +errorMessage )
    // ..
  });
        }
        else
        {
    signInWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    // navigate("/browse")

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+ "" +errorMessage )

  });
        }
    }
    const toggleSignInForm = () => {
        setIsSignForm(!isSignInForm)

         
    }
    return(
        <div><Header/>

<div className="absolute">
        <img className="min-h-screen w-full object-cover" src={BG_URL} alt="logo"></img> 
    </div>
 
        <form onSubmit={(e)=> e.preventDefault()} className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80" >
            <h1 className="text-2xl font-bold mb-4">{isSignInForm ?  "Sign In" : "Sign Up"}</h1>
        {!isSignInForm &&
            <div className="mb-4">
        <input
            type="text"
            placeholder="Enter Full Name"
            className="w-full p-3 my-2 bg-gray-700"
        />
    </div> 
}


            <div className="mb-4">
        <input
            ref = {email}
            type="text"
            placeholder="Email Address"
            className="w-full p-3 my-2 bg-gray-700"
        />
    </div> 
    <div className="mb-4">
        <input
            ref = {password}
            type="password"
            placeholder="Password"
            className="w-full p-3 my-2 bg-gray-700 "
        />
        <p className="bg-red-500 ">{errorMessage}</p>
    </div>
            <button className="w-full py-3 my-3 bg-red-500 text-white rounded hover:bg-red-600"  onClick={handleButtonClick}>{isSignInForm ?  "Sign In" : "Sign Up"}</button>
            <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ?  "New to Netflix ? Sign Up Now" : "Already Registered? Sign In Now"}
</p>
        </form>
        
        
        
        </div>
        
    )
}

export default Login;

