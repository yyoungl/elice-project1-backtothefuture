import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function UserEditForm({ user, setIsEditing, setUser }) {
  //useState로 name 상태를 생성함.
  const [image, setImage]= useState("");
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [blog, setBlog] = useState(user.blog);
  const [github, setGithub] = useState(user.github);
  const [description, setDescription] = useState(user.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("image",image)
    console.log("name",name)

    const data = {
      name,
      email,
      github,
      blog,
      description,
    }

    const isValidGithub = github.startsWith("https://") ||
    github.startsWith("http://")

    if (
      !isValidGithub
    ) {
      setGithub(`https://${github}`)
      data.github = `https://${github}`
    } 

    const isValidBlog = blog.startsWith("https://") ||
    blog.startsWith("http://")

    if (
      !isValidBlog
    ) {
      setBlog(`https://${blog}`)
      data.blog = `https://${blog}`
    } 


    


    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`users/${user.id}`, data, image);
    // 유저 정보는 response의 data임.
  
    const updatedUser = res.data;




    
    
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);
    

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Card className="mb-2">
      <Card.Body>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="userEditImage" className="mb-3">
          <Form.Label>프로필 사진 변경</Form.Label>
          <Form.Control
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
          </Form.Group>


          <Form.Group controlId="userEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditGithub" className="mb-3">
            <Form.Control
              type="string"
              placeholder="Github"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditBlog" className="mb-3">
            <Form.Control
              type="string"
              placeholder="Blog"
              value={blog}
              onChange={(e) => setBlog(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditDescription">
            <Form.Control
              type="text"
              placeholder="정보, 인사말"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
