// import ProfilePic from "./profile-pic";
import { Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import BioEditor from "./bio-editor";

export default function Profile(props) {
    return (
        <>
            <div className="profile-container background  mt-5">
                <Row>
                    <Col className="d-flex justify-content-center mt-3">
                        <img
                            src={props.imgUrl}
                            alt={`${props.firstName} ${props.lastName}`}
                            className="profile-img"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <h2 className="text-capitalize">
                            {props.firstName} {props.lastName}
                        </h2>
                    </Col>
                </Row>
                <div className="d-flex justify-content-center m-2">
                    <BioEditor bio={props.bio} setBio={props.setBio} />
                </div>
            </div>
        </>
    );
}
