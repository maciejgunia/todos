import { useAuth0 } from "@auth0/auth0-react";
import React, { FC, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { axios } from "../lib/axios";

const queryClient = new QueryClient();
export const AuthContext = React.createContext({ isLoggedIn: false, isAuthLoading: true });

const AppProvider: FC = ({ children }) => {
    const { getAccessTokenSilently } = useAuth0();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    useEffect(() => {
        const getAccessToken = async () => {
            const domain = "dev-boefz5w6.us.auth0.com";

            try {
                const token = await getAccessTokenSilently({
                    audience: `https://${domain}/api/v2/`,
                    scope: "read:current_user"
                });

                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                setIsLoggedIn(true);
            } catch (e: any) {
                console.error(e.message);
            }

            setIsAuthLoading(false);
        };

        getAccessToken();
    }, [getAccessTokenSilently]);

    return (
        <QueryClientProvider client={queryClient}>
            <AuthContext.Provider value={{ isLoggedIn, isAuthLoading }}>{children}</AuthContext.Provider>
        </QueryClientProvider>
    );
};

export default AppProvider;
