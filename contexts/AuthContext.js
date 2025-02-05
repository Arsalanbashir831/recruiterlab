import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import apiCaller from "@/helper/apiCaller";
import { Authentication,User } from "@/routes/routes";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
const [userInfo , setUserInfo] = useState(null)
  useEffect(() => {
    let intervalId;

    const checkAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/auth");
        return;
      }

      try {
        await apiCaller(Authentication.verifyToken, "POST", { token: accessToken }, true);
        setIsLoggedIn(true);
       const userInfResponse= await apiCaller(User.loggedInUserInfo,'GET',null,'json',true)
       if(userInfResponse){
           setUserInfo(userInfResponse)
       }
      } catch (error) {
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          if (!refreshToken) throw new Error("No refresh token available");

          const refreshResponse = await apiCaller(Authentication.refreshToken, "POST", { refresh: refreshToken });
          const { access } = refreshResponse;
          localStorage.setItem("accessToken", access);
          window.location.reload()
          setIsLoggedIn(true);
        } catch (refreshError) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          router.push("/auth");
        }
      }
    };

    // Run `checkAuth` immediately and then every 5 seconds
    checkAuth();
    intervalId = setInterval(checkAuth, 15000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [router]);

  return <AuthContext.Provider value={{ isLoggedIn , userInfo }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
