import ProfilePic from "./profile-pic";
import BioEditor from "./bio-editor";

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
                <h4>
                    {props.firstName} {props.lastName}
                </h4>
                <p>{props.bio}</p>
                <BioEditor bio={props.bio} setBio={props.setBio} />
            </div>
        </>
    );
}
