import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <div>
            {isAuthenticated && (
                <div className="flex">
                    <img className="w-16 rounded-xl" src={user?.picture} alt={user?.name} />
                    <div className="flex flex-col items-start p-2 justify-around">
                        <p>{user?.name}</p>
                        <p>{user?.email}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
