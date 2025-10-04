import { Row, Col } from "react-bootstrap";
import { useUser } from "../context/UserContext";
import { useUserPosts } from "../hooks/useUserPosts";
import { useCategories } from "../hooks/useCategories";
import { useUserComments } from "../hooks/useUserComments";
import { useNavigate } from "react-router-dom";
import type Post from "../interfaces/Post";
import type UserComment from "../interfaces/UserComment";

import UserInfoCard from "../components/UserInfoCard";
import UserPostsSection from "../components/UserPostsSection";
import UserCommentsSection from "../components/UserCommentsSection";

import EditModal from "../components/EditPostModal";
import EditCommentModal from "../components/EditCommentModal";
import ConfirmModal from "../components/ConfirmModal";
import { useModal } from "../hooks/useModal";

UserPage.route = { path: "/user" };

export default function UserPage() {
  const { user, setUser, loading } = useUser();
  const { posts, setPosts } = useUserPosts(user);
  const [comments, setComments] = useUserComments(user);
  const categories = useCategories();
  const navigate = useNavigate();

  // Modal hooks
  const deletePostModal = useModal<Post>();
  const editPostModal = useModal<Post>();
  const editCommentModal = useModal<UserComment>();
  const deleteCommentModal = useModal<UserComment>();

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

  // Confirm delete post
  function confirmDeletePost(post: Post) { deletePostModal.open(post); }

  // Confirm delete comment
  function confirmDeleteComment(comment: UserComment) { deleteCommentModal.open(comment); }

  // Edit comment
  function handleEditComment(comment: UserComment) { editCommentModal.open(comment); }


  async function handleDeletePostConfirmed() {
    if (!deletePostModal.selectedItem) return;
    const response = await fetch(`/api/posts/${deletePostModal.selectedItem.id}`, { method: "DELETE" });
    if (response.ok) setPosts(prev => prev.filter(p => p.id !== deletePostModal.selectedItem!.id));
    else alert("Failed to delete post.");
    deletePostModal.close();
  }

  async function handleDeleteCommentConfirmed() {
    if (!deleteCommentModal.selectedItem) return;
    const response = await fetch(`/api/comments/${deleteCommentModal.selectedItem.id}`, { method: "DELETE" });
    if (response.ok) setComments(prev => prev.filter(c => c.id !== deleteCommentModal.selectedItem!.id));
    else alert("Failed to delete comment.");
    deleteCommentModal.close();
  }

  async function handleSave(updatedPost: Post) {
    const response = await fetch(`/api/posts/${updatedPost.id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updatedPost)
    });
    if (response.ok) setPosts(prev => prev.map(p => (p.id === updatedPost.id ? updatedPost : p)));
    else alert("Failed to update post.");
    editPostModal.close();
  }

  async function handleSaveComment(updatedComment: UserComment) {
    const response = await fetch(`/api/comments/${updatedComment.id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updatedComment)
    });
    if (response.ok) {
      setComments(prev => prev.map(c => c.id === updatedComment.id ? updatedComment : c));
    } else {
      alert("Failed to update comment.");
    }
    editCommentModal.close();
  }

  return (
    <>
      <Row className="text-center">
        <Col>
          <h2 className="text-primary">User Page</h2>

          <Row className="text-center">
            <UserInfoCard
              user={user}
              handleLogout={handleLogout} />
          </Row>
        </Col>
      </Row>
      <UserPostsSection posts={posts} onEdit={handleEdit} onDelete={confirmDeletePost} />

      <UserCommentsSection comments={comments} onEdit={handleEditComment} onDelete={confirmDeleteComment} />

      <ConfirmModal
        show={deletePostModal.show}
        title="Confirm Delete"
        message={`Are you sure you want to delete ${deletePostModal.selectedItem?.title}?`}
        onConfirm={handleDeletePostConfirmed}
        onCancel={deletePostModal.close}
      />
      <ConfirmModal
        show={deleteCommentModal.show}
        title="Confirm Delete"
        message={`Are you sure you want to delete this comment?`}
        onConfirm={handleDeleteCommentConfirmed}
        onCancel={deleteCommentModal.close}
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

      {editCommentModal.selectedItem && (
        <EditCommentModal
          show={editCommentModal.show}
          onHide={editCommentModal.close}
          comment={editCommentModal.selectedItem}
          onSave={handleSaveComment}
        />
      )}
    </>
  );
}