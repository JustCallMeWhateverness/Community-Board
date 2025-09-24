import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';


UserPage.route = {
  path: '/user',
  menuLabel: 'User',
  index: 4
}


export default function UserPage() {

  const navigate = useNavigate();
  const { user, loading } = useUser();
  if (loading) return <p>Loading user data...</p>;

  if (!user) return <p className="text-danger">No user is logged in.</p>;

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