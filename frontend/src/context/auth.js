import { useContext,useState,useEffect,createContext} from "react";
import axios from "axios";

 
const AuthContext=createContext()


const AuthContextProvider = ({children})=>{
    const [auth,setAuth]=useState({
        user:null,
        token:"",
    })

    // default axios
    axios.defaults.headers.common["Authorization"] = auth?.token

    useEffect(()=>{
        const data=localStorage.getItem('auth')
        if(data){
            const parseData=JSON.parse(data)
            setAuth(
                {
                    ...auth,
                    user:parseData.user,
                    token:parseData.token,
                }
            )
        }
    },[])

    return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

//custom hook
 
const useAuthContext = ()=>{
    return useContext(AuthContext)
}

export {useAuthContext,AuthContextProvider}