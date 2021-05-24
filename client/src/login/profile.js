// import ProfilePic from "./profile-pic";
import { Container, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import BioEditor from "./bio-editor";

export default function Profile(props) {
    return (
        <>
            <Container className="bg-white mt-5 profile-container d-flex-justify-content-center">
                <Row className="d-flex-align-items-center mt-4">
                    <Col xs lg="2">
                        <img
                            src={props.imgUrl}
                            alt={`${props.firstName} ${props.lastName}`}
                            className="profile-img"
                        />
                    </Col>
                    <Col>
                        <h2>
                            {props.firstName} {props.lastName}
                        </h2>

                        <BioEditor bio={props.bio} setBio={props.setBio} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}
