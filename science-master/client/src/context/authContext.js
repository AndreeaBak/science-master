import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  )

  const login = async(inputs) => {
   const res = await axios.post("/auth/login", inputs);
   setCurrentUser(res.data)
  }

  const logout = async(inputs) => {
    await axios.post("/auth/logout");
    setCurrentUser(null)
   }

   const updateCurrentUser = async (newUserInfo) => {
    try {
      const res = await axios.put(`/users/${currentUser.id}`, newUserInfo);
      const updatedUser = res.data;
      setCurrentUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.log(err);
    }
  };
  

   useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
   }, [currentUser])

   return (
    <AuthContext.Provider value={{currentUser, login, logout, updateCurrentUser }}>
      {children}
    </AuthContext.Provider>
   )
}