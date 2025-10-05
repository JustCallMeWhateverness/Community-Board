import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import type UserComment from "../interfaces/UserComment";

interface Props {
  comments: UserComment[];
  handleEdit: (comment: UserComment) => void;
  handleDelete: (comment: UserComment) => void;
}
export default function CommentList({ comments, handleEdit, handleDelete }: Props) {

  if (comments.length === 0) return <p>You haven't made any comments yet.</p>;
  return (
    <ul className="list-unstyled">
      {comments.map(comment => (
        <li key={comment.id} className="border p-3 bg-light mb-3">
          <span>{comment.text}</span>
          <hr />
          <Button className="ms-2 btn btn-secondary btn-sm" onClick={() => handleEdit(comment)}>Edit</Button>
          <Button className="ms-2 btn btn-danger btn-sm" onClick={() => handleDelete(comment)}>Delete</Button>
        </li>
      ))}
    </ul>
  );
}
