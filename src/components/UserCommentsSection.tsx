import { Row, Col } from "react-bootstrap";
import type UserComment from "../interfaces/UserComment";
import CommentList from "./CommentList";

interface Props {
  comments: UserComment[];
  onEdit: (comment: UserComment) => void;
  onDelete: (comment: UserComment) => void;
}

export default function UserCommentsSection({ comments, onEdit, onDelete }: Props) {
  return (
    <Row className="mt-4 text-center">
      <Col>
        <h4>Your Comments</h4>
        <CommentList comments={comments} handleEdit={onEdit} handleDelete={onDelete} />
      </Col>
    </Row>
  );
}