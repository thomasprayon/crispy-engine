import { useState, useEffect } from "react";
import axios from "./axios";

export default function FindPeople() {
    const [users, setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        console.log("useEffect just ran for /find/users");
        axios
            .get("/find-users")
            .then((data) => {
                // console.log("data.data /find-users: ", data.data);
                setUsers(data.data);
            })
            .catch((err) => {
                console.log("Error in /find/users", err);
            });
    }, []);

    const handleChange = ({ target }) => {
        setSearchInput(target.value);
    };

    return (
        <>
            <div className="findPeople-container">
                <h2>Find People:</h2>
                <input onChange={handleChange} placeholder="Find people..." />

                {users.map((user, index) => {
                    // console.log("user", user);
                    return (
                        <div key={index} className="result-findPeople">
                            <img src={user.img_url} className="profile-img" />
                            <p>
                                {user.first_name} {user.last_name}
                            </p>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
