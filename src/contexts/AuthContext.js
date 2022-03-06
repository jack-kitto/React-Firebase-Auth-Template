import { createUserWithEmailAndPassword } from "firebase/auth"
import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"

const AuthContext = React.createContext()

// function to get access to our auth context in the rest of the app
export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  // State to track if firebase is loading a user
  const [loading, setLoading] = useState(true)
  // This is initially set to true because it loads when the component mounts, 
  // then when the onAuthStateChanged(user) is called back by firebase(after loading) in the useEffect block, it has then been loaded
  // and we set the loading state to false

  // function to create a user in firebase, with email and password
  function signup(email, password) {
      // Firebase function to create user with email and password, using our auth instance defined in firebase.js
      return createUserWithEmailAndPassword(auth, email, password)
  }

  // Set the current user every time this component renders
  useEffect(() => {
      // Firebase calls auth.onAuthStateChanged after creating a user
      // Firebase returns a function, which when called, will unsubscribe the listener when the component is unmounted
      const unsubscribe = auth.onAuthStateChanged(user => {
          // This user that is returned by firebase will be null while the page is loading
          setCurrentUser(user)
          setLoading(false)
    })

    return unsubscribe
  }, [])

  // Props (functions and variables) that will be passed down every child of every child...
  // This allows us to access the current user throughout all of our react components wrapped in <AuthProvider></AuthProvider>
  const value = {
    currentUser,
    signup
  }

  return (
    <AuthContext.Provider value={value}>
        {/* 
            Check to see if the user is loading,
            if the user is loading then don't render anything (children components within AuthProvider context),
        */}
      {!loading && children}
    </AuthContext.Provider>
  )
}