import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import Todos from "./components/Todos";

export const TokenContext = React.createContext("tokenContext");
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});

function App() {
    const { getAccessTokenSilently } = useAuth0();
    const [token, setToken] = useState("");

    useEffect(() => {
        const getAccessToken = async () => {
            const domain = "dev-boefz5w6.us.auth0.com";

            try {
                const accessToken = await getAccessTokenSilently({
                    audience: `https://${domain}/api/v2/`,
                    scope: "read:current_user"
                });

                setToken(accessToken);
            } catch (e: any) {
                console.error(e.message);
            }
        };

        getAccessToken();
    }, [getAccessTokenSilently]);

    return (
        <QueryClientProvider client={queryClient}>
            <TokenContext.Provider value={token}>
                <div className="App">
                    <LoginButton />
                    <LogoutButton />
                    <Profile />
                    {token !== "" && <Todos />}
                </div>
            </TokenContext.Provider>
        </QueryClientProvider>
    );
}

export default App;
