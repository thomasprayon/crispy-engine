export default function NewsItems(props) {
    // console.log("props: ", props);
    return (
        <>
            <div>
                <img src={props.urlToImage} />
                <h3>
                    <a href={props.url}>{props.title}</a>
                </h3>
                <p>{props.description}</p>
            </div>
        </>
    );
}
