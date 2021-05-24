export default function ProfilePic(props) {
    return (
        <>
            <img
                width="50"
                height="50"
                src={props.imgUrl}
                alt={`${props.firstName}  ${props.lastName}`}
                onClick={props.toggleUploader}
                className="profile-pic-img"
            />
        </>
    );
}
