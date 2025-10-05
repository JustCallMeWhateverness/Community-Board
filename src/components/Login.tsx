import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Form, Button } from 'react-bootstrap';

export default function Login() {
  const { setUser } = useUser();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });


  function setProperty(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  }
  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    });
    if (response.ok) {
      const data = await response.json();
      setUser(data);
    } else {
      alert('Login failed');
    }
  }

  return (
    <>
      {/* Login Form */}
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label className="d-block">
            <p>Email</p>
            <Form.Control required
              onChange={(e) => setProperty(e)}
              type="text"
              name="email"
              placeholder="Email"
            />
          </Form.Label>
          <Form.Label className="d-block">
            <p>Password</p>
            <Form.Control required
              onChange={(e) => setProperty(e)}
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
    </>
  );
}