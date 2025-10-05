import { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useUser } from "../context/UserContext";
import { useModal } from "../hooks/useModal";
import type CommentDetailsView from "../interfaces/CommentDetailsView";
import type UserComment from "../interfaces/UserComment";
import EditCommentModal from "./EditCommentModal";


interface Props {
  postID: number;
}

export default function CommentSection({ postID }: Props) {
  const [comments, setComments] = useState<CommentDetailsView[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const { user } = useUser();
  const editCommentModal = useModal<UserComment>()

  const fetchComments = async () => {
    setLoading(true);
    const res = await fetch(`/api/commentdetailsview?postID=${postID}`);
    const data = await res.json();
    setComments(Array.isArray(data) ? data.filter(c => c.postID === postID) : []);
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [postID]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    await fetch(`/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postID: postID, userID: user?.id, text: commentText }),
    });
    setCommentText("");
    fetchComments();
  };

  //Save comment edits
  async function handleSaveComment(updatedComment: UserComment) {
    const payload = {
      id: updatedComment.id,
      postID: updatedComment.postID,
      userID: updatedComment.userID,
      text: updatedComment.text,
      created: updatedComment.createdAt, // map createdAt to created
      updatedAt: new Date().toISOString().slice(0, 10),
    };
    if ("createdAt" in payload) {
      delete (payload as any).createdAt;
    }
    const response = await fetch(`/api/comments/${updatedComment.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      fetchComments(); // Refresh comments from server
    } else {
      alert("Failed to update comment.");
    }
    editCommentModal.close();
  }



  return (
    <Row className="mt-5 justify-content-center">
      <Col md={10} lg={8} className="p-4 border rounded bg-light shadow-sm">
        <h4>Comments</h4>
        {loading ? (
          <p>Loading...</p>
        ) : comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <Row key={comment.commentID} className="mb-3">
              <Col className="p-3 border bg-white rounded">
                <Col className="d-flex justify-content-between align-items-center mb-1">
                  <span className="fw-semibold">{comment.authorUsername}</span>
                  <span className="text-secondary small">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </Col>
                <Col className="fs-6">{comment.text}</Col>
                <Col className="d-flex float-end">
                  {comment.updatedAt && (
                    <span className="text-secondary small fst-italic mt-2 d-block">
                      edited {new Date(comment.updatedAt).toLocaleDateString()}
                    </span>
                  )}
                  {user && comment.authorID === user.id && (
                    <Button
                      size="sm"
                      variant="secondary"
                      className=" py-0 px-1 btn-sm mt-2 ms-3"
                      onClick={() => {
                        const userComment: UserComment = {
                          id: comment.commentID,
                          postID: comment.postID,
                          userID: comment.authorID,
                          text: comment.text,
                          createdAt: comment.createdAt,
                          updatedAt: comment.updatedAt,
                        };
                        editCommentModal.open(userComment);
                      }}
                    >
                      Edit
                    </Button>
                  )}
                </Col>
              </Col>

            </Row>

          ))
        )}


        {user && (
          <Form onSubmit={handleSubmit} className="mt-4">
            <Form.Control
              as="textarea"
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              required
            />
            <Button type="submit" className="mt-2">
              Add Comment
            </Button>
          </Form>
        )}
        {editCommentModal.selectedItem && (
          <EditCommentModal
            show={editCommentModal.show}
            onHide={editCommentModal.close}
            comment={editCommentModal.selectedItem}
            onSave={handleSaveComment}
          />
        )}
      </Col>
    </Row>
  );
}