import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function UserOnline() {
    const userOnline = useSelector((state) => state && state.usersOnline);
    console.log("userOnline: ", userOnline);
    console.log("userOnline in users-online: ", userOnline);

    useEffect(() => {
        console.log("useEffect mounted in users-online.js");
    }, [userOnline]);

    return (
        <>
            <div>
                <h2>Users that are online:</h2>
                {userOnline &&
                    userOnline.map((user, index) => {
                        console.log("user: ", user);
                        console.log("index: ", index);
                        return (
                            <>
                                <p>
                                    {user.first_name} {user.last_name}
                                </p>
                                <img
                                    src={
                                        user.img_url ||
                                        "/images/user_default.png"
                                    }
                                    width="50"
                                    height="50"
                                    className="profile-pic-img"
                                />
                            </>
                        );
                    })}
            </div>
        </>
    );
}
