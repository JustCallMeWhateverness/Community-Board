import { useEffect, useState } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useModal } from "../hooks/useModal";
import type User from "../interfaces/User";
import type Post from "../interfaces/Post";
import type UserComment from "../interfaces/UserComment";

import ConfirmModal from "../components/ConfirmModal";
import EditUserModal from "../components/EditUserModal";
import EditModal from "../components/EditPostModal";
import EditCommentModal from "../components/EditCommentModal";

AdminPage.route = { path: "/admin" };

export default function AdminPage() {
  const { user } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<UserComment[]>([]);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const deleteUserModal = useModal<User>();
  const deletePostModal = useModal<Post>();
  const editUserModal = useModal<User>();
  const editPostModal = useModal<Post>();
  const deleteCommentModal = useModal<UserComment>();
  const editCommentModal = useModal<UserComment>();

  useEffect(() => {
    if (user?.role === "admin") {
      fetch("/api/users").then(res => res.json()).then(setUsers);
      fetch("/api/posts").then(res => res.json()).then(setPosts);
      fetch("/api/comments").then(res => res.json()).then(setComments);
    }
  }, [user]);

  if (user?.role !== "admin") {
    return <p className="text-danger">Access denied. Admins only.</p>;
  }


  // Delete user
  async function handleDeleteUserConfirmed() {
    if (!deleteUserModal.selectedItem) return;
    const response = await fetch(`/api/users/${deleteUserModal.selectedItem.id}`, { method: "DELETE" });
    if (response.ok) {
      setUsers(prev => prev.filter(u => u.id !== deleteUserModal.selectedItem!.id));
    } else {
      alert("Failed to delete user.");
    }
    deleteUserModal.close();
  }

  // Delete post
  async function handleDeletePostConfirmed() {
    if (!deletePostModal.selectedItem) return;
    const response = await fetch(`/api/posts/${deletePostModal.selectedItem.id}`, { method: "DELETE" });
    if (response.ok) {
      setPosts(prev => prev.filter(p => p.id !== deletePostModal.selectedItem!.id));
    } else {
      alert("Failed to delete post.");
    }
    deletePostModal.close();
  }

  // Delete comment
  async function handleDeleteCommentConfirmed() {
    if (!deleteCommentModal.selectedItem) return;
    const response = await fetch(`/api/comments/${deleteCommentModal.selectedItem.id}`, { method: "DELETE" });
    if (response.ok) {
      setComments(prev => prev.filter(c => c.id !== deleteCommentModal.selectedItem!.id));
    } else {
      alert("Failed to delete comment.");
    }
    deleteCommentModal.close();
  }

  // Save user edits
  async function handleSaveUser(updatedUser: User) {
    const response = await fetch(`/api/users/${updatedUser.id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updatedUser)
    });
    if (response.ok) {
      setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    } else {
      alert("Failed to update user.");
    }
    editUserModal.close();
  }

  // Save post edits
  async function handleSavePost(updatedPost: Post) {
    const response = await fetch(`/api/posts/${updatedPost.id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updatedPost)
    });
    if (response.ok) {
      setPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
    } else {
      alert("Failed to update post.");
    }
    editPostModal.close();
  }

  //Save comment edits
  async function handleSaveComment(updatedComment: UserComment) {
    const payload = {
      ...updatedComment,
      updatedAt: new Date().toISOString().slice(0, 10),
    };
    const response = await fetch(`/api/comments/${updatedComment.id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload)
    });
    if (response.ok) {
      setComments(prev => prev.map(c => c.id === updatedComment.id ? { ...updatedComment, updatedAt: payload.updatedAt } : c));
    } else {
      alert("Failed to update comment.");
    }
    editCommentModal.close();
  }

  // Logout
  async function handleLogout() {
    const response = await fetch("/api/login", { method: "DELETE", credentials: "include" });
    if (response.ok) {
      setUser(null);
      navigate("/");
    } else {
      alert("Logout failed.");
    }
  }

  return (
    <Row>
      <Col>
        <h2>Admin Dashboard</h2>
        <Row className="mb-3">
          <Col className="">
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
          </Col>
        </Row>
        <h3>All Users</h3>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Id</th><th>Username</th><th>Email</th><th>Role</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <Button size="sm" variant="secondary" onClick={() => editUserModal.open(u)}>Edit</Button>
                  <Button size="sm" variant="danger" className="ms-2" onClick={() => deleteUserModal.open(u)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <h3>All Posts</h3>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Id</th><th>Title</th><th>User</th><th>Category</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.title}</td>
                <td>{p.userID}</td>
                <td>{p.categoryID}</td>
                <td>
                  <Button size="sm" variant="secondary" onClick={() => editPostModal.open(p)}>Edit</Button>
                  <Button size="sm" variant="danger" className="ms-2" onClick={() => deletePostModal.open(p)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h3>All Comments</h3>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Post ID</th><th>User ID</th><th>Comment</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map(c => (
              <tr key={c.id}>
                <td>{c.postID}</td>
                <td>{c.userID}</td>
                <td>{c.text}</td>
                <td><Button size="sm" variant="secondary" onClick={() => editCommentModal.open(c)}>Edit</Button>
                  <Button size="sm" variant="danger" className="ms-2" onClick={() => deleteCommentModal.open(c)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>



      {/* Modals */}
      <ConfirmModal
        show={deleteUserModal.show}
        title="Confirm Delete User"
        message={`Are you sure you want to delete ${deleteUserModal.selectedItem?.username}?`}
        onConfirm={handleDeleteUserConfirmed}
        onCancel={deleteUserModal.close}
      />
      <ConfirmModal
        show={deletePostModal.show}
        title="Confirm Delete Post"
        message={`Are you sure you want to delete ${deletePostModal.selectedItem?.title}?`}
        onConfirm={handleDeletePostConfirmed}
        onCancel={deletePostModal.close}
      />
      <ConfirmModal
        show={deleteCommentModal.show}
        title="Confirm Delete Comment"
        message={`Are you sure you want to delete this comment?`}
        onConfirm={handleDeleteCommentConfirmed}
        onCancel={deleteCommentModal.close}
      />
      {editUserModal.selectedItem && (
        <EditUserModal
          show={editUserModal.show}
          onHide={editUserModal.close}
          user={editUserModal.selectedItem}
          onSave={handleSaveUser}
        />
      )}
      {editPostModal.selectedItem && (
        <EditModal
          show={editPostModal.show}
          onHide={editPostModal.close}
          post={editPostModal.selectedItem}
          categories={[]}
          onSave={handleSavePost}
        />
      )}
      {editCommentModal.selectedItem && (
        <EditCommentModal
          show={editCommentModal.show}
          onHide={editCommentModal.close}
          comment={editCommentModal.selectedItem}
          onSave={handleSaveComment}
        />
      )}

    </Row>
  );
}