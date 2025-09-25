import { Row, Col, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/UserContext';
import type Post from '../interfaces/Post';
import PostCard from '../parts/PostCard';
import { useEffect, useState } from "react";
import EditModal from "./UserPage/EditModal";

UserPage.route = {
  path: '/user',
}


export default function UserPage() {

  const { user, setUser, loading } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
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
      async function fetchCategories() {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      }

      fetchPosts();
      fetchCategories();
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

  function confirmDelete(post: Post) {
    setPostToDelete(post);
    setShowDeleteModal(true);
  }

  async function handleDeleteConfirmed() {
    if (!postToDelete) return;

    const response = await fetch(`/api/posts/${postToDelete.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setPosts((prev) => prev.filter((p) => p.id !== postToDelete.id));
    } else {
      alert("Failed to delete post.");
    }

    setShowDeleteModal(false);
    setPostToDelete(null);
  }

  function handleEdit(post: Post) {
    setPostToEdit(post);
    setShowEditModal(true);
  }

  async function handleSave(updatedPost: Post) {
    const response = await fetch(`/api/posts/${updatedPost.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost),
    });

    if (response.ok) {
      setPosts((prev) =>
        prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
      );
    } else {
      alert("Failed to update post.");
    }
  }

  return (
    <>
      <Row className="text-center">
        <Col>
          <h2 className="text-primary">User Page</h2>

          <Col className="border p-4 rounded bg-light">
            <h3>{user.username}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role: </strong>{user.role}</p>
            <p><strong>Account Created:</strong> {user.created}</p>
            <hr />
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
            <Button variant="secondary" className="ms-2" >
              Edit information
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
                  <strong>{post.title}</strong>, {post.overview}<hr />
                  <Button className="ms-2 btn btn-primary btn-sm" onClick={() => navigate('/posts/' + post.slug)}>Details</Button>
                  <Button className="ms-2 btn btn-secondary btn-sm" onClick={() => handleEdit(post)}>Edit</Button>
                  <Button className="ms-2 btn btn-danger btn-sm" onClick={() => confirmDelete(post)}>Delete</Button>
                </li>
              ))}
            </ul>
          )}
        </Col>
      </Row >
      <Row className="mt-4 text-center">
        <Col>
          <h4>Your Comments</h4>
          <p>(This section can be expanded to show user's comments.)</p>
        </Col>
      </Row>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>{postToDelete?.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirmed}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {postToEdit && (
        <EditModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          post={postToEdit}
          categories={categories}
          onSave={handleSave}
        />
      )}
    </>
  );
}