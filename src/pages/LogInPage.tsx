import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


LogInPage.route = {
  path: '/log-in',
  menuLabel: 'Log in',
  index: 3
};

export default function LogInPage() {


  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  function setProperty(event: React.ChangeEvent) {
    let { name, value } = event.target as HTMLInputElement;
    setUser({
      ...user,
      [name]: value
    });
  }


  async function sendForm(event: React.FormEvent) {

    event.preventDefault();

    const payload: any = { ...user };

    ;
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    // navigate to
    navigate('/');
  }
  return <>
    <Row>
      <Col>
        <h2 className="text-primary">Log in</h2>
      </Col>
    </Row>
    <Form onSubmit={sendForm}>
      <Form.Group>
        <Form.Label className="d-block">
          <p>Username</p>
          <Form.Control onChange={setProperty} type="text" name="username" placeholder="Username" />
        </Form.Label>
        <Form.Label className="d-block">
          <p>Email</p>
          <Form.Control onChange={setProperty} type="text" name="email" placeholder="Email" />
        </Form.Label>
        <Form.Label className="d-block">
          <p>Password</p>
          <Form.Control onChange={setProperty} type="text" name="password" placeholder="Password" />
        </Form.Label>
      </Form.Group>
      <Button type="submit" className="float-end">Login</Button>
    </Form>
    <Row>
      <Col md={6}>
        <p>If you don't already have an account, please sign up by clicking the button below</p>
      </Col>
      <Col md={6}>
      </Col>
    </Row>
  </>;
}