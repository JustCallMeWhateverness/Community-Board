import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/UserContext';


UserPage.route = {
  path: '/user',
}


export default function UserPage() {

  const { user, setUser, loading } = useUser();
  const navigate = useNavigate();

  if (loading) return <p>Loading user data...</p>;
  if (!user) return <p className="text-danger">No user is logged in.</p>;

  async function handleLogout() {
    const response = await fetch('/api/login', {
      method: 'DELETE',
      credentials: 'include',
    });

    if (response.ok) {
      setUser(null);
      navigate('/');
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
      <Row className="mt-4">
        <Col>
          <h4>Your Posts</h4>
          <p>(This section can be expanded to show user's posts.)</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h4>Your Comments</h4>
          <p>(This section can be expanded to show user's comments.)</p>
        </Col>
      </Row>
    </>
  );
}