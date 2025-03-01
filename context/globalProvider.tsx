import { createContext, useContext, useEffect, useState } from "react"
import { getCurrenUser } from "@/lib/appwrite";

export type PapAoraContextProps = {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    user: any;
    setUser: (value: any) => void;
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
}

export const PapAoraContext = createContext<PapAoraContextProps | null>(null);
export const usePapAoraContext = () => {
    const context = useContext(PapAoraContext);
    if (!context) {
        throw new Error("usePapAoraContext must be used within a PapAoraProvider");
    }
    return context;
};

export const PapAoraProvider = ({children}: {children: React.ReactNode}) => {
    
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getCurrenUser().then((res) => {
            if(res) {
                setIsLoggedIn(true);
                setUser(res as any);
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        })
        .catch((error) => {
            console.error('Error fetching user:', error);
        })
        .finally(() => {
            setIsLoading(false);
        })
    },[])

    return (
        <PapAoraContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            isLoading,
            setIsLoading,
        }}>
            {children}
        </PapAoraContext.Provider>
    )
}