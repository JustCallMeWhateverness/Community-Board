import { Button, Col } from "react-bootstrap";
import type User from '../interfaces/User';


interface Props {
  user: User;
  handleEditUser: (user: User) => void;
  handleLogout: () => void;
}
export default function UserInfoCard({ user, handleEditUser, handleLogout }: Props) {
  return (
    <Col className="border p-4 bg-light">
      <h3>{user.username}</h3>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role: </strong>{user.role}</p>
      <p><strong>Account Created:</strong> {user.created}</p>
      <hr />
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
      <Button variant="secondary" className="ms-2" onClick={() => handleEditUser(user)}>
        Edit information
      </Button>
    </Col>

  );
}