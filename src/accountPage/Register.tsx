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
    <>
      <Form onSubmit={handleSignup}>
        <Form.Group>
          <Form.Label className="d-block">
            <p>Username</p>
            <Form.Control required
              name="username"
              onChange={setProperty}
              placeholder="Enter username"
            />
          </Form.Label>
          <Form.Label className="d-block">
            <p>Email</p>
            <Form.Control required
              name="email"
              type="email"
              onChange={setProperty}
              placeholder="Enter email"
            />
          </Form.Label>
          <Form.Label className="d-block">
            <p>Password</p>
            <Form.Control required
              name="password"
              type="password"
              onChange={setProperty}
              placeholder="Enter password"
            />
          </Form.Label>
        </Form.Group>
        <Button type="submit" className="float end">
          Sign Up
        </Button>
      </Form>
    </>
  );
}