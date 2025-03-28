import { axiosInstance } from "@/lib/axios"
import { useAuthStore } from "@/stores/useAuthStore";
import { useAuth } from "@clerk/clerk-react"
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react"

const updateApiToken = (token: string | null) => {
    if(token)axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    else delete axiosInstance.defaults.headers.common['Authorization'];
};

const AuthProvider = ({children}:{children:React.ReactNode}) => {
    const {getToken} = useAuth()
    const [loding, setLoding] = useState(true)
    const {checkAdminStatus} = useAuthStore();

    useEffect(()=>{
        const initAuth = async () => {
            try {
                const token = await getToken()
                updateApiToken(token)
                if(token){
                    await checkAdminStatus();
                }
            } catch (error:any) {
                updateApiToken(null);
                console.log("Error in auth Provider: ",);
            }finally{
                setLoding(false);
            }
        };

        initAuth();
    },[getToken]);

        if(loding)return (
    <div className="h-screen flex items-center justify-center">
        <Loader className="size-8 text-emerald-500 animate-spin" />
    </div>
    )

  return  <>{children}</>
};
export default AuthProvider
