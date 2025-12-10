// src/Auth/AuthProvider.jsx
import React, { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';
import { AuthContext } from './AuthContext';


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Google Login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider).finally(() =>
      setLoading(false)
    );
  };

  // Email & Password Register
  const register = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false)
    );
  };

  // Email & Password Login
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false)
    );
  };

  // Logout
  const logout = () => {
    setLoading(true);
    return signOut(auth).finally(() => setLoading(false));
  };

  // Observe user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const AuthInfo = {
    user,
    loading,
    register,
    login,
    logout,
    googleLogin,
  };

  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
