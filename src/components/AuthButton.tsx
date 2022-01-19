import { useAuth0 } from "@auth0/auth0-react";
import { FC, useContext } from "react";
import { MdLogin, MdLogout } from "react-icons/md";
import { AuthContext } from "../providers/AppProvider";

const AuthButton: FC = () => {
    const { loginWithRedirect, logout } = useAuth0();
    const { isLoggedIn } = useContext(AuthContext);
    const handler = isLoggedIn ? () => logout({ returnTo: window.location.origin }) : () => loginWithRedirect();
    const icon = isLoggedIn ? <MdLogout /> : <MdLogin />;

    return (
        <button onClick={handler} className="border p-2 rounded-md hover:bg-gray-600">
            {icon}
        </button>
    );
};

export default AuthButton;
