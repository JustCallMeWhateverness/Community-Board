import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

LogInPage.route = {
  path: '/log-in',
  menuLabel: 'Log in',
  index: 3
};



export default function LogInPage() {
  const [showSignUp, setShowSignUp] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  function setProperty(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    formType: 'login' | 'signup'
  ) {
    const { name, value } = event.target;
    if (formType === 'login') {
      setLoginData({ ...loginData, [name]: value });
    } else {
      setSignupData({ ...signupData, [name]: value });
    }
  }

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      navigate('/User');
    } else {
      alert('Login failed');
    }
  }

  async function handleSignup(event: React.FormEvent) {
    event.preventDefault();

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signupData),
    });

    if (response.ok) {
      setShowSignUp(false);
      alert('Signup successful! You can now log in.');
    } else {
      alert('Signup failed');
    }
  }

  return (
    <>
      <Row>
        <Col>
          <h2 className="text-primary">Log in</h2>
        </Col>
      </Row>

      {/* Login Form */}
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label className="d-block">
            <p>Email</p>
            <Form.Control
              onChange={(e) => setProperty(e, 'login')}
              type="text"
              name="email"
              placeholder="Email"
            />
          </Form.Label>
          <Form.Label className="d-block">
            <p>Password</p>
            <Form.Control
              onChange={(e) => setProperty(e, 'login')}
              type="password"
              name="password"
              placeholder="Password"
            />
          </Form.Label>
        </Form.Group>
        <Button type="submit" className="float-end">
          Login
        </Button>
      </Form>

      <Row className="mt-4">
        <Col md={6}>
          <p>If you don't already have an account, please sign up:</p>
        </Col>
        <Col md={6}>
          <Button
            type="button"
            className="float-start"
            onClick={() => setShowSignUp(true)}
          >
            Sign up
          </Button>
        </Col>
      </Row>

      {/* Signup Modal */}
      <Modal show={showSignUp} onHide={() => setShowSignUp(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSignup}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control required
                onChange={(e) => setProperty(e, 'signup')}
                type="text"
                name="username"
                placeholder="Enter username"
              />

              <Form.Label>Email</Form.Label>
              <Form.Control required
                onChange={(e) => setProperty(e, 'signup')}
                type="email"
                name="email"
                placeholder="Enter email"
              />

              <Form.Label>Password</Form.Label>
              <Form.Control required
                onChange={(e) => setProperty(e, 'signup')}
                type="password"
                name="password"
                placeholder="Enter password"
              />
            </Form.Group>
            <div className="mt-3 d-flex justify-content-end">
              <Button variant="secondary" onClick={() => setShowSignUp(false)}>
                Cancel
              </Button>
              <Button type="submit" className="ms-2">
                Sign Up
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}