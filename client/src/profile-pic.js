export default function ProfilePic(props) {
    return (
        <>
            <h2>
                Hey I am the Xmpl component. My name is: {props.firstName} {""}
                {props.lastName}
            </h2>
            <img className="small" src={props.imgUrl} />
        </>
    );
}
