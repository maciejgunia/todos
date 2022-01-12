import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import Todos from "./components/Todos";

export const instance = axios.create();

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});

function App() {
    const { getAccessTokenSilently } = useAuth0();
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
            <div className="App">
                <LoginButton />
                <LogoutButton />
                <Profile />
                {isLoggedIn && <Todos />}
            </div>
        </QueryClientProvider>
    );
}

export default App;
