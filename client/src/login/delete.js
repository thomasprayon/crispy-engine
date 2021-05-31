import { Link } from "react-router-dom";
import axios from "../axios";

export default function DeleteUser() {
    const handleDelete = () => {
        console.log("handleDelete working!");
        axios
            .post("/delete", (req, res) => {
                console.log("POST axios /delete/user was made!");
                location.reload();
            })
            .catch((err) => {
                console.log("Error in POST in axios /delete/user", err);
            });
    };

    return (
        <>
            <h1>Delete User Component</h1>
            <div>
                <h3>Do you really want to leave us??</h3>
                <div>
                    <button onClick={handleDelete}>Delete my account</button>
                </div>
                <div>
                    <Link to="/">
                        <button>I change my mind</button>
                    </Link>
                </div>
            </div>
        </>
    );
}
