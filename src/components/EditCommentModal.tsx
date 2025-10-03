import { Modal, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import type UserComment from "../interfaces/UserComment";


export default function EditCommentModal({
  show,
  onHide,
  comment,
  onSave,
}: {
  show: boolean;
  onHide: () => void;
  comment: UserComment;
  onSave: (formData: any) => void;
}) {
  const [formData, setFormData] = useState({
    text: ""
  });

  // Pre-fill form when modal opens with the comment data
  useEffect(() => {
    if (comment) {
      setFormData({
        text: comment.text,
      });
    }
  }, [comment]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ ...comment, ...formData }); // pass back the updated data
    onHide();
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className="d-block">
              <p>Comment:</p>
              <Form.Control
                required
                value={formData.text}
                onChange={handleChange}
                type="text"
                name="text"
                placeholder="Comment"
              />
            </Form.Label>

          </Form.Group>

          <Button type="submit" className="float-end">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
