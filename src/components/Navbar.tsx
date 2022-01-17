import { FC } from "react";
import AuthButton from "./AuthButton";
import Profile from "./Profile";

const Navbar: FC = () => (
    <div className="bg-gray-800 text-white flex justify-between items-center p-4">
        <Profile />
        <AuthButton />
    </div>
);

export default Navbar;
