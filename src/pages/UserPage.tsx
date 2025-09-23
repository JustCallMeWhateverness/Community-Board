import { useEffect, useState } from 'react';
import type User from '../interfaces/User';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


UserPage.route = {
  path: '/user',
  menuLabel: 'User',
  index: 4
}


export default function UserPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the currently logged-in user from session
    async function fetchUser() {
      try {
        const response = await fetch("/api/login", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok && !data.error) {
          setUser(data);
        } else {
          setError(data.error || "Failed to fetch user");
        }
      } catch (err) {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  if (!user) return <p>No user is logged in.</p>;

  async function handleLogout() {
    const response = await fetch('/api/login', {
      method: 'DELETE',
      credentials: 'include',
    });

    if (response.ok) {
      alert('Logged out successfully.');
      navigate('/log-in');
    } else {
      alert('Logout failed.');
    }
  }


  return (
    <>
      <Row>
        <Col>
          <h2 className="text-primary">User Page</h2>

          <div>
            <h3>{user.username}</h3>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>Account Created: {user.created}</p>
            <hr />
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}