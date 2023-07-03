import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import { User } from '../models/entities/User';
import { createUser } from '../services/userService';
import { getItem, setItem } from '../utils/localStorageHelper';

type AuthContextType = {
  userData: User | null;
  handleSetUserData: (userData: User | null) => void;
};

const AuthContext = createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<User | null>(getItem('user'));
  const [loading, setLoading] = useState(true);

  const handleSetUserData = useCallback((userData: User | null) => {
    setUserData(userData);
    setItem('user', userData);
  }, []);

  const initAuth = useCallback(async () => {
    if (!userData) {
      const user = await createUser();
      handleSetUserData(user);
    }
    setLoading(false);
  }, [userData, handleSetUserData]);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

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
