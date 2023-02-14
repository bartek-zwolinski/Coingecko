import React , { ReactNode, useContext, useState, useEffect } from "react";
import { auth } from "../Components/Firebase/Firebase"

interface Props {
    children?: ReactNode
}

type Value = {
    currentUser: {
      email: string;
    }
    signup: (email:string, password:string) => void;
    login: (email:string, password:string) => void;
    logout: () => void;
    resetPassword: (email:string) => void;
    updatePassword: (password:string) => void;
    updateEmail: (email:string) => void;
}

const AuthContext = React.createContext<Value>({currentUser: {email: ''}, signup:(email, password)=> {}, login:(email, password)=> {}, logout:()=>{}, resetPassword:(email)=> {}, updatePassword:(password)=> {}, updateEmail:(email)=> {}}); ///// ??

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

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email:string) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email:string) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password:string) {
    return currentUser.updatePassword(password)
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
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
}

  return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
  )
}
