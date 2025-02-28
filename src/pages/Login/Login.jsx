/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import "./style.scss";
import { checkValidData } from "../../utils/validate";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { addUser } from "../../store/userSlice";
import { USER_AVATAR } from "../../utils/constant";

const Login = () => {
    const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    console.log(message, "user");
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
        //Sign Up logic
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            updateProfile(user, {
              displayName: name.current.value, photoURL: USER_AVATAR
            }).then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
                      dispatch(
                        addUser({
                          uid: uid,
                          email: email,
                          displayName: displayName,
                          photoURL: photoURL,
                        })
                      );
             
            }).catch((error) => {
              setErrorMessage(error.message)
            });
            
           
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
          });
      } else {
        //Sign in Logic
        signInWithEmailAndPassword(auth,email.current.value,password.current.value)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
          });
      }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };
  return (
    <div className="login-container">
      <div className="loginForm-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <h1>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
          {!isSignInForm && (
            <input ref={name} type="text" placeholder="Full Name" />
          )}
          <input ref={email} type="text" placeholder="Email Address" />
          <input ref={password} type="password" placeholder="Password" />
          <p className="error-msg">{errorMessage}</p>
          <button onClick={handleButtonClick}>
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p onClick={toggleSignInForm}>
            {isSignInForm
              ? "New to Movix? Sign up now"
              : "Already Registered? Sign In now"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
