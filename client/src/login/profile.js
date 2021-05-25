// import ProfilePic from "./profile-pic";
import { Container, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import BioEditor from "./bio-editor";

export default function Profile(props) {
    return (
        <>
            <Container className="container profile-container bg-white mt-5">
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
                        <h2>
                            {props.firstName} {props.lastName}
                        </h2>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                    <BioEditor bio={props.bio} setBio={props.setBio} />
                </Row>
            </Container>
        </>
    );
}
