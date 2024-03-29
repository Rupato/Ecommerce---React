import { createContext,useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserMethodFromAuth } from '../utils/firebase'
//as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
})

export const UserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  useEffect(() => {
    onAuthStateChangedListener((user) => {
      if(user){
        createUserMethodFromAuth(user)
      }
      setCurrentUser(user);
    })
    //return unsubscribe;
  },[])
  return <UserContext.Provider value={value}>
    {children}
  </UserContext.Provider>
}