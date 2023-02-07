import React , { ReactNode, useContext, useState, useEffect } from "react";
import { auth } from "../Components/Firebase/Firebase"

interface Props {
    children?: ReactNode
}





/// ? 

    type Value = {
            currentUser: any;
            signup: (email:string, password:string) => void;
            login: any;
    }

const AuthContext = React.createContext<Value>({currentUser: '', signup:(email, password)=> {}, login: ''}); ///// ??

export function useAuth() {
    return useContext(AuthContext);
}









export function AuthProvider({children, ...props}: Props) {

    const [currentUser, setCurrentUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

  function signup(email:string, password:string) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email:string, password:string) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user:any) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

const value = { 
    currentUser,
    login,
    signup
}

  return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
  )
}
