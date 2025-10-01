import { Row, Col } from "react-bootstrap";
import type User from "../interfaces/User";

interface Props {
  user: User;
}

export default function UserComments({ user }: Props) {
  return (
    <Row className="mt-4 text-center">
      <Col>
        <h4>Your Comments</h4>
        <p>(This section can be expanded to show {user.username}'s comments.)</p>
      </Col>
    </Row>
  );
}