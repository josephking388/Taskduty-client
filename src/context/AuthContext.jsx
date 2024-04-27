import React, {createContext,useState,useEffect} from "react";

const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [loggedIn, setLoggedIn] = useState(undefined);
    const token = localStorage.getItem("token");

    async function getLoggedIn () {
        const request = await fetch ("https://taskduty-server-c65y.onrender.com/api/v1/isloggedin",{
            method: "GET",
            headers:{
                Authorization:`Bearer ${token}`
            }
                
        });

        const response = await request.json();
        console.log(response);
        setLoggedIn(response)
    }

    // logout ftn

    const logout = ()=>{
        localStorage.removeItem("token")
        location.reload()
    }

    useEffect(()=>{
        getLoggedIn()
    },[])

    return(
        <AuthContext.Provider
        value={{
            getLoggedIn,
            loggedIn,
            setLoggedIn,
            logout
        }}
        >
            {children}

        </AuthContext.Provider>
    )
}

export default AuthContext;