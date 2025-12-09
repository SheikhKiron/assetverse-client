import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const google = () => {
  return signInWithPopup(auth, googleProvider);
  }
  const register = (email,password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  const login = (email,password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }
  const logout = () => {
    return signOut(auth)
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return ()=>unsubscribe()
  },[])
  const AuthInfo = {
    register,
    login,
    logout,
    user,
    loading,
    google
  }
  return <AuthContext value={AuthInfo}>{children}</AuthContext>;
};

export default AuthProvider;