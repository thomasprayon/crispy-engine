import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function UserStatus() {
    const userStatus = useSelector((state) => state && state.userStatus);
    console.log("userStatus: ", userStatus);

    useEffect(() => {
        console.log("useEffect mounted in users-status.js");
    }, [userStatus]);

    return (
        <>
            <div>
                <h2>Users that are online</h2>
                {userStatus &&
                    userStatus.map((user, index) => {
                        console.log("user: ", user);
                        console.log("index: ", index);
                        return (
                            <>
                                <p>
                                    Here are the users that are online in the
                                    moment
                                </p>
                            </>
                        );
                    })}
            </div>
        </>
    );
}
