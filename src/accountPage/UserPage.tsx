import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/UserContext';
import type Post from '../interfaces/Post';
import PostCard from '../parts/PostCard';
import { useEffect, useState } from "react";


UserPage.route = {
  path: '/user',
}


export default function UserPage() {

  const { user, setUser, loading } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      async function fetchPosts() {
        const response = await fetch("/api/posts"); // fetch all posts
        if (response.ok) {
          const data: Post[] = await response.json();
          // filter posts belonging to the logged-in user
          setPosts(data.filter((p) => p.userID === user?.id));
        }
      }
      fetchPosts();
    }
  }, [user]);

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
      <Row className="text-center">
        <Col>
          <h2 className="text-primary">User Page</h2>

          <Col className="border p-4 rounded bg-light">
            <h3>{user.username}</h3>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>Account Created: {user.created}</p>
            <hr />
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </Col>
        </Col>
      </Row>
      <Row className="mt-4 text-center">
        <Col>
          <h4>Your Posts</h4>
          {posts.length === 0 ? (
            <p>You haven't created any posts yet.</p>
          ) : (
            <ul className="list-unstyled ">
              {posts.map((post) => (
                <li key={post.id} className="border p-3 rounded bg-light mb-3">
                  <Button
                    variant="button"
                    onClick={() => navigate("/posts/" + post.slug)}
                    className="p-0"
                  >
                    <strong>{post.title}</strong>, {post.overview}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </Col>
      </Row>
      <Row className="mt-4 text-center">
        <Col>
          <h4>Your Comments</h4>
          <p>(This section can be expanded to show user's comments.)</p>
        </Col>
      </Row>
    </>
  );
}