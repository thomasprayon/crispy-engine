import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function UserOnline() {
    const userOnline = useSelector((state) => state && state.userStatus);
    console.log("userOnline: ", userOnline);

    useEffect(() => {
        console.log("useEffect mounted in users-status.js");
    }, [userOnline]);

    return (
        <>
            <div>
                <h2>Users that are online</h2>
                {userOnline &&
                    userOnline.map((user, index) => {
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