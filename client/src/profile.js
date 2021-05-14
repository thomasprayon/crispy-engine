import ProfilePic from "./profile-pic";

export default function Profile(props) {
    return (
        <>
            <div className="profile-container">
                <h2>Profile component</h2>
                <img
                    src={props.imgUrl}
                    alt={`${props.firstName} ${props.lastName}`}
                    className="profile-img"
                />
                <p>
                    {props.firstName}
                    {""}
                    {props.lastName}
                </p>
            </div>
        </>
    );
}
