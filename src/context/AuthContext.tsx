import { getUserAccount } from "@/lib/appwrite/api";
import { IContextType, IUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialUser = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const initialState = {
  user: initialUser,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};
const AuthContext = createContext<IContextType>(initialState);
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function checkAuthUser() {
    try {
      const userAccount = await getUserAccount();
      setIsLoading(true);
      if (!userAccount) throw Error;
      setUser({
        id: userAccount.$id,
        bio: userAccount.bio,
        email: userAccount.email,
        imageUrl: userAccount.imageUrl,
        name: userAccount.name,
        username: userAccount.username,
      });
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }
   useEffect(() => {
     const cookieFallback = localStorage.getItem("cookieFallback");
     if (
       cookieFallback === "[]" ||
       cookieFallback == null 
     ) {
       navigate("/sign-in");
     }

     checkAuthUser();
   }, []);
  const value = {
    user,
    isLoading,
    setUser,
    setIsAuthenticated,
    isAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useUserContext = () => {
  return useContext(AuthContext);
};
