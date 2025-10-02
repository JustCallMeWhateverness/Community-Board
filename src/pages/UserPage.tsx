import { Row, Col } from "react-bootstrap";
import { useUser } from "../context/UserContext";
import { useUserPosts } from "../hooks/useUserPosts";
import { useCategories } from "../hooks/useCategories";
import { useNavigate } from "react-router-dom";
import type Post from "../interfaces/Post";
import type User from "../interfaces/User";

import UserInfoCard from "../components/UserInfoCard";
import UserPostsSection from "../components/UserPostsSection";
import UserComments from "../components/UserCommentsSection";

import EditModal from "../components/EditModal";
import EditUserModal from "../components/EditUserModal";
import ConfirmModal from "../components/ConfirmModal";
import { useModal } from "../hooks/useModal";

UserPage.route = { path: "/user" };

export default function UserPage() {
  const { user, setUser, loading } = useUser();
  const { posts, setPosts } = useUserPosts(user);
  const categories = useCategories();
  const navigate = useNavigate();

  // Modal hooks
  const deletePostModal = useModal<Post>();
  const editPostModal = useModal<Post>();
  const editUserModal = useModal<User>();

  if (loading) return <p>Loading user data...</p>;
  if (!user) return <p className="text-danger">No user is logged in.</p>;

  // Logout
  async function handleLogout() {
    const response = await fetch("/api/login", { method: "DELETE", credentials: "include" });
    if (response.ok) { setUser(null); navigate("/"); }
    else { alert("Logout failed."); }
  }

  // Edit post
  function handleEdit(post: Post) { editPostModal.open(post); }

  // Edit user
  function handleEditUser(user: User) { editUserModal.open(user); }

  // Confirm delete
  function confirmDeletePost(post: Post) { deletePostModal.open(post); }

  async function handleDeletePostConfirmed() {
    if (!deletePostModal.selectedItem) return;
    const response = await fetch(`/api/posts/${deletePostModal.selectedItem.id}`, { method: "DELETE" });
    if (response.ok) setPosts(prev => prev.filter(p => p.id !== deletePostModal.selectedItem!.id));
    else alert("Failed to delete post.");
    deletePostModal.close();
  }

  async function handleSave(updatedPost: Post) {
    const response = await fetch(`/api/posts/${updatedPost.id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updatedPost)
    });
    if (response.ok) setPosts(prev => prev.map(p => (p.id === updatedPost.id ? updatedPost : p)));
    else alert("Failed to update post.");
    editPostModal.close();
  }

  async function handleSaveUser(updatedUser: User) {
    const response = await fetch(`/api/users/${updatedUser.id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updatedUser)
    });
    if (response.ok) setUser(updatedUser);
    else alert("Failed to update user information.");
    editUserModal.close();
  }

  return (
    <>
      <Row className="text-center">
        <Col>
          <h2 className="text-primary">User Page</h2>

          <Row className="text-center">
            <UserInfoCard
              user={user}
              handleEditUser={handleEditUser}
              handleLogout={handleLogout} />
          </Row>
        </Col>
      </Row>
      <UserPostsSection posts={posts} onEdit={handleEdit} onDelete={confirmDeletePost} />

      <UserComments user={user} />

      <ConfirmModal
        show={deletePostModal.show}
        title="Confirm Delete"
        message={`Are you sure you want to delete ${deletePostModal.selectedItem?.title}?`}
        onConfirm={handleDeletePostConfirmed}
        onCancel={deletePostModal.close}
      />

      {editPostModal.selectedItem && (
        <EditModal
          show={editPostModal.show}
          onHide={editPostModal.close}
          post={editPostModal.selectedItem}
          categories={categories}
          onSave={handleSave}
        />
      )}

      {editUserModal.selectedItem && (
        <EditUserModal
          show={editUserModal.show}
          onHide={editUserModal.close}
          user={editUserModal.selectedItem}
          onSave={handleSaveUser}
        />
      )}
    </>
  );
}