export default function ProfilePic(props) {
    return (
        <>
            <div className="img-profilePic">
                <img
                    className="profile-picture-img"
                    src={props.imgUrl}
                    alt={`${props.firstName} + ${props.lastName}`}
                    onClick={props.toggleUploader}
                />
            </div>
        </>
    );
}
