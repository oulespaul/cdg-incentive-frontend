import { AppUser } from '@/types/auth';
import { createContext, ReactNode, useContext, useState } from 'react';

interface UserProviderProps {
    children: ReactNode;
}

interface UserContextType {
    user: AppUser | undefined;
    setUser: React.Dispatch<React.SetStateAction<AppUser | undefined>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<AppUser | undefined>(undefined);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
