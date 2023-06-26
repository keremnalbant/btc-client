import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { User } from "../models/entities/User";
import { createCookie } from "../services/cookieService";
import { getMe } from "../services/userService";
import { getCookie } from "../utils/getCookie";

type AuthContextType = {
  userData: User | null;
  handleSetUserData: (userData: User | null) => void;
};

const AuthContext = createContext<any>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleSetUserData = useCallback((userData: User | null) => {
    setUserData(userData);
  }, []);

  const fetchUserData = useCallback(async () => {
    const data = await getMe();
    setUserData(data);
  }, []);

  const initAuth = useCallback(async () => {
    if (!userData) {
      await createCookie();
      await fetchUserData();
    }
    setLoading(false);
  }, [fetchUserData, userData]);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  useEffect(() => {
    if (!getCookie("btc-session"))
      toast.warn(
        "This page uses cookies, by closing this message you will accept the use of cookies.",
        {
          autoClose: false,
        },
      );
  }, []);

  const value: AuthContextType = { userData, handleSetUserData };
  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <Layout>
          <Loader />
        </Layout>
      ) : (
        <Layout>{children}</Layout>
      )}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  return useContext<AuthContextType>(AuthContext);
};

export { AuthProvider, useAuth };

