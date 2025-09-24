import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function setProperty(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setSignupData({ ...signupData, [name]: value });
  }

  async function handleSignup(event: React.FormEvent) {
    event.preventDefault();

    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupData),
    });

    if (response.ok) {
      alert("Signup successful! You can now log in.");
      navigate("/login");
    } else {
      alert("Signup failed.");
    }
  }

  return (
    <Row>
      <Col>
        <h2 className="text-primary">Register</h2>
        <Form onSubmit={handleSignup}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control required
              name="username"
              onChange={setProperty}
              placeholder="Enter username"
            />

            <Form.Label>Email</Form.Label>
            <Form.Control required
              name="email"
              type="email"
              onChange={setProperty}
              placeholder="Enter email"
            />

            <Form.Label>Password</Form.Label>
            <Form.Control required
              name="password"
              type="password"
              onChange={setProperty}
              placeholder="Enter password"
            />
          </Form.Group>
          <Button type="submit" className="mt-3">
            Sign Up
          </Button>
        </Form>
      </Col>
    </Row>
  );
}