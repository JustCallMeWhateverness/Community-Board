import { Modal, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import type Post from "../../interfaces/Post";


export default function EditModal({
  show,
  onHide,
  post,
  categories,
  onSave,
}: {
  show: boolean;
  onHide: () => void;
  post: Post;
  categories: { id: number; name: string }[];
  onSave: (formData: any) => void;
}) {
  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    description: "",
    categoryID: "",
  });

  // Pre-fill form when modal opens with the post data
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        overview: post.overview,
        description: post.description,
        categoryID: String(post.categoryID),
      });
    }
  }, [post]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ ...post, ...formData }); // pass back the updated data
    onHide();
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className="d-block">
              <p>Title:</p>
              <Form.Control
                required
                value={formData.title}
                onChange={handleChange}
                type="text"
                name="title"
                placeholder="Title"
              />
            </Form.Label>
            <Form.Label className="d-block">
              <p>Overview:</p>
              <Form.Control
                required
                value={formData.overview}
                onChange={handleChange}
                type="text"
                name="overview"
                placeholder="Overview"
              />
            </Form.Label>
            <Form.Label className="d-block">
              <p>Description:</p>
              <Form.Control
                required
                value={formData.description}
                onChange={handleChange}
                type="text"
                name="description"
                placeholder="Description"
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <p>Category</p>
              <Form.Select
                required
                onChange={handleChange}
                name="categoryID"
                value={formData.categoryID}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </Form.Select>
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
