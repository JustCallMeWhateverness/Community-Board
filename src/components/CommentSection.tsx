import { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useUser } from "../context/UserContext";
import type CommentDetailsView from "../interfaces/CommentDetailsView";

interface Props {
  postID: number;
}

export default function CommentSection({ postID }: Props) {
  const [comments, setComments] = useState<CommentDetailsView[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const { user } = useUser();

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
                    on {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </Col>
                <Col className="fs-6">{comment.text}</Col>
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
      </Col>
    </Row>
  );
}