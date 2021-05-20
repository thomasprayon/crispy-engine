import ProfilePic from "./profile-pic";
import BioEditor from "./bio-editor";

export default function Profile(props) {
    return (
        <>
            <div className="profile-container">
                <div className="img-profile">
                    <img
                        src={props.imgUrl}
                        alt={`${props.firstName} ${props.lastName}`}
                        className="profile-img"
                    />
                </div>
                <div className="info-profile">
                    <h2>
                        {props.firstName} {props.lastName}
                    </h2>
                    <BioEditor bio={props.bio} setBio={props.setBio} />
                </div>
            </div>
        </>
    );
}
