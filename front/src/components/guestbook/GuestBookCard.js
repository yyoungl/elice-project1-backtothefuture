import { Card, Modal, Button, Row, Col } from "react-bootstrap";
import {useState,useEffect} from 'react';
import * as Api from "../../api";

function GuestBookCard({ guestBook, isEditable, setIsEditing, setGuestBooks }) {
  const handleDelete = async () => {
    await Api.delete("guestBooks", guestBook.id).then(() => {
      setGuestBooks((prevGuestBooks) =>
        prevGuestBooks.filter((prevGuestBook) => prevGuestBook.id !== guestBook.id)
      );
    });
  };

  useEffect(() => {}, [guestBook]);
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{guestBook?.title}</span>
          <br />
          <span>{guestBook?.grade}</span>
          <br />
          <span>{guestBook?.date}</span>
          <br />
          <span>{guestBook?.description}</span>
        </Col>
        {isEditable && (
          <Col xs lg="3" style={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
              className="me-1"
            >
              편집
            </Button>
            <>
              <Button variant="outline-danger" onClick={handleShow} size = "sm" >
                삭제
              </Button>

              <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                  <Modal.Title>삭제</Modal.Title>
                </Modal.Header>
                <Modal.Body>정말로 삭제하시겠습니까? T.T</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    취소
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleClose();
                      handleDelete();
                    }}
                  >
                    확인
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default GuestBookCard;