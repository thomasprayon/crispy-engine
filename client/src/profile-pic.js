export default function ProfilePic(props) {
    return (
        <>
            <p>ProfilePic</p>
            <div className="profilePic-img-container">
                <img
                    className="small"
                    src={props.imgUrl}
                    alt={`${props.firstName} + ${props.lastName}`}
                    onClick={props.toggleUploader}
                />
            </div>
            <div className="profile-txt-container">
                <p>
                    {props.firstName} {""} {props.lastName}
                </p>
            </div>
            <p>/Profile-Pic</p>
        </>
    );
}
