import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Navbar from "./components/Navbar";
import Todos from "./components/Todos";
import Message from "./components/Message";

export const instance = axios.create();
export const AuthContext = React.createContext(false);

const queryClient = new QueryClient();

function App() {
    const { getAccessTokenSilently, isLoading, isAuthenticated } = useAuth0();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const getAccessToken = async () => {
            const domain = "dev-boefz5w6.us.auth0.com";

            try {
                const token = await getAccessTokenSilently({
                    audience: `https://${domain}/api/v2/`,
                    scope: "read:current_user"
                });

                instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                setIsLoggedIn(true);
            } catch (e: any) {
                console.error(e.message);
            }
        };

        getAccessToken();
    }, [getAccessTokenSilently]);

    return (
        <QueryClientProvider client={queryClient}>
            <AuthContext.Provider value={isLoggedIn}>
                <Navbar></Navbar>
                {isLoading && <Message text="Checking authentication status..." />}
                {!isLoading && !isAuthenticated && <Message text="You have to be logged in to use the app!" />}
                {!isLoading && isAuthenticated && !isLoggedIn && <Message text="Getting an access token for you..." />}
                {isLoggedIn && <Todos />}
            </AuthContext.Provider>
        </QueryClientProvider>
    );
}

export default App;
