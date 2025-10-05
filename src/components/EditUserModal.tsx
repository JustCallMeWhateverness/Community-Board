import { Modal, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import type User from "../interfaces/User";


export default function EditUserModal({
  show,
  onHide,
  user,
  onSave,
}: {
  show: boolean;
  onHide: () => void;
  user: User;
  onSave: (formData: any) => void;
}) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPasswordField, setShowPasswordField] = useState(false);

  // Pre-fill form when modal opens with the user data
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        password: "", // Password is not pre-filled for security reasons
      });
      setShowPasswordField(false);
    }
  }, [user]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ ...user, ...formData }); // pass back the updated data
    onHide();
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className="d-block">
              <p>Username:</p>
              <Form.Control
                required
                value={formData.username}
                onChange={handleChange}
                type="text"
                name="username"
                placeholder="Username"
              />
            </Form.Label>
            <Form.Label className="d-block">
              <p>Email:</p>
              <Form.Control
                required
                value={formData.email}
                onChange={handleChange}
                type="text"
                name="email"
                placeholder="Email"
              />
            </Form.Label>
            {!showPasswordField && (
              <Button
                variant="secondary"
                className="mb-2"
                onClick={() => setShowPasswordField(true)}
              >
                Change Password
              </Button>
            )}
            {showPasswordField && (
              <Form.Label className="d-block">
                <p>New Password:</p>
                <Form.Control
                  required
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                />
                <Form.Text className="text-muted">
                  Enter a new password to change it.
                </Form.Text>
              </Form.Label>
            )}
          </Form.Group>

          <Button type="submit" className="float-end">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
